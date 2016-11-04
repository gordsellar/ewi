import _ from 'lodash'

export const SHARP = '\u266F' // MUSIC SHARP SIGN
export const FLAT = '\u266D'; // MUSIC FLAT SIGN

export function bitCount(i) {
  // Counts the number of set bits in i (Hamming Weight)
  // taken from http://stackoverflow.com/questions/109023/how-to-count-the-number-of-set-bits-in-a-32-bit-integer
  i -= (i >> 1) & 0x55555555;
  i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
  return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}

export function adjustOctave(note, roller) {
  // Takes a note string in "Helmholtz pitch notation" adapts it to the given roller position
  // The input is expected to be based on the default roller position (0)
  if (roller === 0)
    return note

  // special handling for notes above/below the "main" octave
  let octave = roller
  let letter = note.charAt(0)
  if (letter.toUpperCase() === letter) {
    octave -= 1
    note = _.lowerFirst(note)
  }
  else if (note.charAt(note.length - 1) === "'") {
    octave += 1
    note = note.slice(0, note.length - 1)
  }

  if (octave < 0) {
    note = _.upperFirst(note)
    note += ",".repeat(Math.abs(octave) - 1)
  }
  else if (octave > 0) {
    note += "'".repeat(octave)
  }

  return note
}

export function sharpen(note) {
  // Adds sharp sign at the right position.
  // Does NOT handle notes that already have accidentals!
  let letter = note.slice(0, 1)
  let rest = note.slice(1)
  return letter + '#' + rest
}

export function flatten(note) {
  // Adds flat sign at the right position.
  // Does NOT handle notes that already have accidentals!
  let letter = note.slice(0, 1)
  let rest = note.slice(1)
  return letter + 'b' + rest
}

export function showFlat(note) {
  // Takes a 'sharp' note and converts it to the equivalent 'flat' one
  // Does NOT handle special cases - input needs to have '#' as second character and b# doesn't work
  let letter = note.charAt(0)
  let charCode = letter.charCodeAt(0)
  return String.fromCharCode(charCode + 1) + 'b' + note.slice(2)  
}
// eslint-disable-next-line no-func-assign
showFlat = _.memoize(showFlat)
