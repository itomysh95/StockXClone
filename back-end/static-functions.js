// capitalize first letter of every word
const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

<<<<<<< HEAD
export {
=======
module.exports = {
>>>>>>> 2411ca756a1a655b2b54cd94da58e147b6afe002
    toTitleCase
}