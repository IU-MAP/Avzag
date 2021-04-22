import { reactive, readonly, Ref, toRaw, toRefs } from "vue";
import { Howl, Howler } from "howler";
import { root } from "@/store";

type Track = {
  i: number;
  src: string;
  seek: number;
  error?: boolean;
  howl?: Howl;
};

const state = reactive({
  key: null as null | string,
  timer: 0 as unknown,
  current: undefined as undefined | Track,
  queue: [] as Track[],
});

function url(lect: string, file: string) {
  return `${root}${lect}/audio/${file}.m4a`;
}

function canPlay(result: Ref<string[]>, lect: string, files: string[]) {
  files
    .map((f) => url(lect, f))
    .map((u, i) =>
      fetch(u)
        .then((r) => r.blob())
        .then(({ type }) => type.includes("audio"))
        .then((a) => (result.value[i] = a ? u : ""))
    );
}

function play(lect: string, files: string[], key?: string) {
  stop();
  state.key = key ?? lect ?? files[0];
  state.timer = setInterval(seek, 50) as unknown;

  state.queue = files
    .map((f) => (lect ? url(lect, f) : f))
    .map((src, i) => {
      const track: Track = {
        i,
        src,
        seek: 0,
      };
      if (src)
        track.howl = new Howl({
          src: [src],
          format: ["m4a"],
          onplay: () => (state.current = track),
          onend: () => next(i),
          onplayerror: () => next(i),
          onloaderror: () => {
            if (!state.current || toRaw(state.current) === track) next(i);
            else track.error = true;
          },
        });
      return track;
    });
  next(-1);
}

function next(i: number) {
  if (state.current) state.current.seek = 0;
  const track = state.queue[i + 1];
  state.current = track;
  if (!track?.howl) stop();
  else if (track.error) next(i + 1);
  else track.howl.play();
}

function seek() {
  if (!state.current?.howl) return;
  const howl = state.current.howl;
  state.current.seek = <number>howl.seek() / howl.duration();
}

function stop() {
  Howler.unload();
  state.key = null;
  clearInterval(state.timer as number);
  state.current = undefined;
  state.queue.length = 0;
}

export default readonly({ ...toRefs(state), canPlay, play, stop });
