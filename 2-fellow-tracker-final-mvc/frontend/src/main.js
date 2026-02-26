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
  const input = document.querySelector('#fellow-name-input');
  const fellowName = input.value.trim();
  if (!fellowName) return;

  const { error } = await createFellow(fellowName);
  if (error) return renderError(error.message);

  input.value = '';
  await loadFellows();
};

// Handle Delete, Edit, and Save Clicks
const handleFellowsListClick = async (e) => {
  const clickedListItem = e.target.closest('li');
  if (!clickedListItem) return;

  const id = clickedListItem.dataset.id;

  // Handle Delete Clicks
  if (e.target.classList.contains('delete-btn')) {
    const { error } = await deleteFellow(id);
    if (error) return renderError(error.message);
    await loadFellows();
  }

  // Handle Edit/Save Button Clicks
  if (e.target.classList.contains('edit-btn')) {
    // Get these elements INSIDE the clicked li
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
      const { error } = await updateFellow(id, editInput.value.trim());
      if (error) return renderError(error.message);
      await loadFellows();
    }
  }
};

// Add Event Listeners
document.querySelector('#add-fellow-form').addEventListener('submit', handleAddFellow);
document.querySelector('#fellows-list').addEventListener('click', handleFellowsListClick);

// Load Fellows on Page Load
loadFellows();
