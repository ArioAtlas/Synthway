export interface SpinnerInterface {
  initial(): Promise<void>;
  start(message?: string): void;
  stop(): void;
  succeed(message?: string): void;
  error(message?: string): void;
  info(message?: string): void;
  warning(message?: string): void;
}
