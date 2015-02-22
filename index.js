var es = require('event-stream'),
  gutil = require('gulp-util');

module.exports = function (opt) {
  function gulpInsertLines(file) {
    if (file.isNull()) return this.emit('data', file);
    if (file.isStream()) return this.emit('error', new Error("gulp-insert-lines: Streaming not supported"));
    var str = file.contents.toString('utf8');
    var line, i, lines;
    var newLines = [];

    lines = str.split(/\r\n|\r|\n/g);

    for (i = 0; i < lines.length; i++) {

      if (opt.after) {
        if (lines[i].match(opt.after)) {
          newLines.push(lines[i]);
          newLines.push(opt.lineAfter);
        } else {
          newLines.push(lines[i]);
        }
      }

      if (opt.before) {
        if (lines[i].match(opt.before)) {
          newLines.push(opt.lineBefore);
          newLines.push(lines[i]);
        } else {
          newLines.push(lines[i]);
        }
      }
    }

    str = newLines.join('\n');

    file.contents = new Buffer(str);
    this.emit('data', file);
  }

  return es.through(gulpInsertLines);
};
