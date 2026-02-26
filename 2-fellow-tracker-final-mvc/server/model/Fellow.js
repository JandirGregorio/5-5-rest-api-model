// Auto-incrementing ID generator
const getId = ((id = 0) => () => ++id)();

// Restrict access to our mock "database" to just the Model
const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

class Fellow {
  // Create and add the new fellow to the "database" (the fellows array)
  // Rather than using a constructor, we use a static method to create a new fellow
  static create(name) {
    const newFellow = {
      name,
      id: getId()
    }
    fellows.push(newFellow);
    return newFellow;
  }

  // Get all values from the "database"
  static list() {
    return [...fellows];
  }

  // Get one value from the "database"
  static find(id) {
    return fellows.find((fellow) => fellow.id === id);
  }

  // Update one value from the "database"
  static editName(id, newName) {
    const fellow = Fellow.find(id);
    if (!fellow) return null;
    fellow.name = newName;
    return fellow;
  }

  // Delete one value from the "database"
  static delete(id) {
    const fellowIndex = fellows.findIndex((fellow) => fellow.id === id);
    if (fellowIndex < 0) return false;

    fellows.splice(fellowIndex, 1);
    return true;
  }
}

module.exports = Fellow;

/* 
Take a moment and play with these class methods. Try the following and
run this file with `node Fellow.js`:

console.log(Fellow.list())
console.log(Fellow.find(1))
console.log(Fellow.editName(1, 'ZO!!'))
console.log(Fellow.delete(2))
console.log(Fellow.list())
*/
