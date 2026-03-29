/**
 * Screen capture + mic for feedback clips.
 * Secure context (HTTPS / localhost) required. Always stop tracks in `finally`.
 */

export type RecorderSession = {
  stream: MediaStream;
  stopAll: () => void;
};

function stopTracks(ms: MediaStream | null) {
  ms?.getTracks().forEach((t) => {
    try {
      t.stop();
    } catch {
      /* ignore */
    }
  });
}

/** Merge display (video + optional tab audio) with microphone into one stream. */
export async function buildScreenWithVoiceStream(): Promise<RecorderSession> {
  if (!window.isSecureContext) {
    throw new Error("HTTPS_REQUIRED");
  }
  if (!navigator.mediaDevices?.getDisplayMedia) {
    throw new Error("SCREEN_CAPTURE_UNAVAILABLE");
  }

  const display = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true,
  });

  let mic: MediaStream;
  try {
    mic = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (e) {
    stopTracks(display);
    throw e;
  }

  const videoTracks = display.getVideoTracks();
  if (!videoTracks.length) {
    stopTracks(display);
    stopTracks(mic);
    throw new Error("NO_VIDEO_TRACK");
  }

  let out: MediaStream;
  let ctx: AudioContext | null = null;

  try {
    ctx = new AudioContext();
    const dest = ctx.createMediaStreamDestination();
    const micSrc = ctx.createMediaStreamSource(mic);
    micSrc.connect(dest);
    for (const t of display.getAudioTracks()) {
      try {
        ctx.createMediaStreamSource(new MediaStream([t])).connect(dest);
      } catch {
        /* tab/system audio may be missing */
      }
    }
    out = new MediaStream([...videoTracks, ...dest.stream.getAudioTracks()]);
  } catch {
    if (ctx) void ctx.close().catch(() => {});
    out = new MediaStream([...videoTracks, ...mic.getAudioTracks()]);
  }

  const stopAll = () => {
    stopTracks(display);
    stopTracks(mic);
    stopTracks(out);
    if (ctx) void ctx.close().catch(() => {});
  };

  return { stream: out, stopAll };
}

export function pickRecorderMime(): string {
  const cands = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"];
  for (const c of cands) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(c)) return c;
  }
  return "video/webm";
}

export function startRecording(stream: MediaStream, mime: string): { stop: () => Promise<Blob> } {
  let mr: MediaRecorder;
  try {
    mr = new MediaRecorder(stream, { mimeType: mime });
  } catch {
    mr = new MediaRecorder(stream);
  }
  const chunks: BlobPart[] = [];
  const blobPromise = new Promise<Blob>((resolve, reject) => {
    mr.ondataavailable = (e) => {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    mr.onerror = () => reject(new Error("RECORDER_ERROR"));
    mr.onstop = () => resolve(new Blob(chunks, { type: mime.split(";")[0] || "video/webm" }));
  });
  mr.start(250);
  let stopped = false;
  return {
    stop: () => {
      if (!stopped) {
        stopped = true;
        try {
          if (mr.state !== "inactive") mr.stop();
        } catch {
          /* ignore */
        }
      }
      return blobPromise;
    },
  };
}
