import { getFellows, createFellow, updateFellow, deleteFellow } from './fetch-helpers.js';
import { renderFellows, renderError } from './dom-helpers.js';

const loadFellows = async () => {
  const { data, error } = await getFellows();
  if (error) return renderError(error.message);
  renderError();
  renderFellows(data);
};

// Handle Form Submissions
const handleAddFellow = async (e) => {
  e.preventDefault();
  const nameInput = document.querySelector('#fellow-name-input');
  const fellowName = nameInput.value.trim();
  if (!fellowName) return;

  // TODO: call createFellow(fellowName) and handle the response
  console.log(`Creating fellow: ${fellowName}`);
  const { error } = await createFellow(fellowName);
  if (error) return renderError(error.message);

  nameInput.value = '';
  await loadFellows();
};

// Handle Delete, Edit, and Save Clicks
const handleFellowsListClick = async (e) => {
  const clickedListItem = e.target.closest('li');
  if (!clickedListItem) return;

  const id = clickedListItem.dataset.id;

  // Handle Delete Clicks
  if (e.target.classList.contains('delete-btn')) {
    // TODO: create the deleteFellow(id) helper and then invoke it here
    console.log(`Deleting fellow with id: ${id}`);
    await loadFellows();
  }

  // Handle Edit/Save Button Clicks
  if (e.target.classList.contains('edit-btn')) {
    const nameSpan = clickedListItem.querySelector('span');
    const editInput = clickedListItem.querySelector('input');
    const editBtn = clickedListItem.querySelector('.edit-btn');

    // Click on "Edit" --> Switch to Edit Mode
    if (editBtn.textContent === 'Edit') {
      nameSpan.classList.add('hidden');
      editInput.classList.remove('hidden');
      editBtn.textContent = 'Save';
    }

    // Click on "Save" --> Update the fellow and reload fellows
    else {
      const fellowName = editInput.value.trim();
      // TODO: create the updateFellow(id, fellowName) helper and then invoke it here
      console.log(`Updating fellow ${id} to: ${fellowName}`);
      await loadFellows();
    }
  }
};

// Add Event Listeners
document.querySelector('#add-fellow-form').addEventListener('submit', handleAddFellow);
document.querySelector('#fellows-list').addEventListener('click', handleFellowsListClick);

// Load Fellows on Page Load
loadFellows();
