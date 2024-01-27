// Define an array to store records
let records = [];

// Function to render a single record
const renderRecord = (record) => {
  const { title, link, platform, genre, isAdult } = record;
  const ageRestriction = isAdult ? '<p><strong>Age Restriction:</strong> 18+</p>' : '';
  
  return `
    <div class="record">
      <h2><a href="${link}" target="_blank">${title}</a></h2>
      <p><strong>Platform:</strong> ${platform}</p>
      <p><strong>Genre:</strong> ${genre}</p>
      ${ageRestriction}
      <button onclick="deleteRecord('${title}')" class="button">Delete</button>
    </div>
  `;
};

// Function to render the list of records
const renderRecordList = () => {
  const recordList = records.map(renderRecord).join('');
  const recordListContainer = document.getElementById('recordList');
  recordListContainer.innerHTML = recordList;
};

// Function to add a record
const addRecord = (event) => {
  event.preventDefault();
  const titleInput = document.getElementById('title');
  const platformInput = document.getElementById('platform');
  const genreInput = document.getElementById('genre');
  const linkInput = document.getElementById('link');
  const isAdultInput = document.getElementById('isAdult');

  // Retrieve input values
  const title = titleInput.value.trim();
  const platform = platformInput.value.trim();
  const genre = genreInput.value.trim();
  const link = linkInput.value.trim();
  const isAdult = isAdultInput.checked;

  // Validate input
  if (!title || !platform || !genre || !link) {
    showAlert('error', 'Please fill out all fields.');
    return;
  }

  // Add the record to the records array
  records.push({ title, platform, genre, link, isAdult });

  // Render the updated list of records
  renderRecordList();

  // Reset the form
  event.target.reset();

  // Display success message
  showAlert('success', 'Record added successfully!');
};

// Function to delete a record
const deleteRecord = (title) => {
  const confirmation = confirm("Are you sure you want to delete this record?");
  if (confirmation) {
    // Filter out the record with the specified title
    records = records.filter(record => record.title !== title);

    // Render the updated list of records
    renderRecordList();
  }
};

// Event listener for adding a record
document.getElementById('addRecordForm').addEventListener('submit', addRecord);

// Function to show an alert message
const showAlert = (type, message) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  container.insertBefore(alert, container.firstChild);

  // Hide the alert after 3 seconds
  setTimeout(() => {
    alert.remove();
  }, 3000);
};
