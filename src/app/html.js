function htmlTemplate({ htmlWebpackPlugin }) {
    return `
<html>
    <head>
        <title>Score Anything</title>
        <link rel="manifest" href="manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
        ${htmlWebpackPlugin.tags.headTags}
    </head>
    <body>
        <div id="root" />
        ${htmlWebpackPlugin.tags.bodyTags}
    </body>
</html>
`;
}

module.exports = { htmlTemplate };