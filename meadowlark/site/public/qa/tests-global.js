suite('Global tests', function () {
    test('Page has valid Title', function () {
            assert(document.title && document.title.match(/\S/)) && document.title.to() !== 'TODO');
    });
});