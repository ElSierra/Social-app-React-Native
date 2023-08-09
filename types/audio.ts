export type AudioPlayerState = {
    androidImplementation: string;
    audioPan: number;
    didJustFinish: boolean;
    durationMillis: number;
    isBuffering: boolean;
    isLoaded: boolean;
    isLooping: boolean;
    isMuted: boolean;
    isPlaying: boolean;
    playableDurationMillis: number;
    positionMillis: number;
    progressUpdateIntervalMillis: number;
    rate: number;
    shouldCorrectPitch: boolean;
    shouldPlay: boolean;
    uri: string;
    volume: number;
  };