// Load quotes from localStorage if available
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "Believe you can and you're halfway there.", category: "Motivation" },
  { text: "Simplicity is the soul of efficiency.", category: "Productivity" },
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const selectedCategory = document.getElementById("categoryFilter")?.value;
  const filteredQuotes = selectedCategory && selectedCategory !== "All"
    ? quotes.filter(q => q.category === category)
    : quotes;

  if (filteredQuotes.length === 0) {
    document.getElementById("quoteDisplay").innerHTML = "<p>No quotes available.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML = <p><strong>${quote.category}:</strong> ${quote.text}</p>;
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes();
    populateCategories(); // update filter list
    alert("Quote added!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("Please fill in both fields.");
  }
}

// Dynamically create quote form
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.id = "addQuote";
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  document.body.appendChild(formDiv);
}

// Create category dropdown filter
function createCategoryFilter() {
  const select = document.createElement("select");
  select.id = "categoryFilter";
  select.addEventListener("change", showRandomQuote);
  document.body.insertBefore(select, document.getElementById("quoteDisplay"));
  populateCategories();
}

// Populate category filter with unique values
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  select.innerHTML = "";

  const categories = ["All", ...new Set(quotes.map(q => q.category))];

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.appendChild(option);
  });
}

// Export quotes to JSON
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
}

// Import quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid format.");
      }
    } catch (err) {
      alert("Error reading file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Required function for submission
function filterQuote() {
  showRandomQuote();
}

// Simulated fetch function to load quotes from a "server"
function fetchQuotesFromServer() {
  const serverQuotes = [
    { text: "Hard work beats talent when talent doesn't work hard.", category: "Motivation" },
    { text: "Productivity is never an accident.", category: "Productivity" }
  ];

  quotes.push(...serverQuotes);
  saveQuotes();
  populateCategories();
}

// Initialize everything
fetchQuotesFormServer()
createCategoryFilter();
createAddQuoteForm();
document.getElementById("newQuote").addEventListener("click", showRandomQuote);