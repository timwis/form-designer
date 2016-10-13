# Form designer
Drag & drop designer for building forms.

It's intended for use in [stately](https://github.com/codeforphilly/stately),
but it's being designed to be reusable in other applications. Do you have a
need for something like this? [Tell us about it](https://github.com/timwis/form-designer/issues/new)
so we can design with it in mind.

Status: Work in progress

![screenshot of app](http://i.imgur.com/iaLC5Ia.png)

## Usage
Install dependencies via:
```bash
npm install
```

Run a development server using:
```bash
npm start
```

Compile for production using:
```bash
npm run build
```

Deploy to surge.sh using:
```bash
npm run deploy
```
(Note that `deploy` runs `build` for you, and that you need access to the
  surge site in order to deploy to it.)
