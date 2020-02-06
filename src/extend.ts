interface IExtend {
    [key: string]: {
        path: string;
    };
}

export const extend: IExtend = {
    dart: {
        path: "Dart/devreplay.json"
    },
    java: {
        path: "Java/devreplay.json",
    },
    android: {
        path: "Java/android.json"
    },
    javascript : {
        path: "JavaScript/devreplay.json",
    },
    angular : {
        path: "JavaScript/angular.json",
    },
    react: {
        path: "JavaScript/react.json"
    },
    vscode: {
        path: "JavaScript/vscode.json"
    },
    vue: {
        path: "JavaScript/vue.json"
    },
    python: {
        path: "Python/devreplay.json",
    },
    ruby: {
        path: "Ruby/devreplay.json",
    },
    rails: {
        path: "Ruby/rails.json",
    }
};
