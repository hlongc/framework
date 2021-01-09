export class AppService {
  hello() {
    return 'hello';
  }
  world() {
    return 'world';
  }
}

export class UseClassLogger {
  log(message: string): void {
    console.log(message);
  }
}

export class UseValueLogger {
  log(message: string): void {
    console.log(message);
  }
}

export class UseFactoryLogger {
  log(message: string): void {
    console.log(message);
  }
}
