type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  meta?: any;
  error?: string;
  stack?: string;
}

class Logger {
  private log(level: LogLevel, message: string, meta?: any, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(meta && { meta }),
      ...(error && { 
        error: error.message,
        stack: error.stack 
      }),
    };

    const logString = JSON.stringify(entry);
    
    switch (level) {
      case 'error':
        console.error(logString);
        break;
      case 'warn':
        console.warn(logString);
        break;
      case 'debug':
        if (process.env.NODE_ENV === 'development') {
          console.debug(logString);
        }
        break;
      default:
        console.log(logString);
    }
  }

  info(message: string, meta?: any) {
    this.log('info', message, meta);
  }

  warn(message: string, meta?: any) {
    this.log('warn', message, meta);
  }

  error(message: string, error?: Error, meta?: any) {
    this.log('error', message, meta, error);
  }

  debug(message: string, meta?: any) {
    this.log('debug', message, meta);
  }
}

export const logger = new Logger();