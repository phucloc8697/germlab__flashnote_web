import localFont from 'next/font/local'

const fontCaros = localFont({
  variable: '--font-caros',
  src: [
    {
      path: '../public/fonts/Caros.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Light Italic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Thin.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Thin Italic.ttf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Medium Italic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Bold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Bold Italic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros ExtraBold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros ExtraBold Italic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Heavy.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Heavy Italic.ttf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/Caros Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/Caros Black Italic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
})

export { fontCaros }
