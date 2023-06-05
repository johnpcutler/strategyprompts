// Sample JSON for prompts
const prompts = [
    { parts: ["In the next twelve months, we are going to intentionally deprioritize ", " based on evidence that ", ". We’ll revisit this decision periodically, and be on the lookout for ", "."] },
    { parts: ["While our competitors get distracted by ", " we’ll stay focused on ", ". While they focus on ", " we’ll allow ourselves to diverge and explore new ways to ", "."] },
    { parts: ["There’s a counterintuitive element to the question of whether to ", " or ", ". And that’s that ","."] },
    { parts: ["We need to ", " before ", ". If we don’t, we run the risk of ", "."] },
    { parts: ["We have flexibility when it comes to ", ". But if we don’t " , " in the next ", " we’ll be in less of a position to use that flexibility to our advantage."] },
    { parts: ["We are admittedly less experienced at ", ". But we do know ", " and we can ", ". So there may be more options here than we think."] },
    { parts: ["Despite our many disadvantages when it comes to ", ", I do believe we have leverage when it comes to ", ". This will not be easy, but there’s an opportunity to ","."] },
    { parts: ["While competitors are going to zig by ", " we’re going to try to zag by ", ". We believe that will ", " despite signals that ","."] },
    { parts: ["Our key strategy is to turn the game of ", " into a game of ","."] },
    { parts: ["The riskiest assumption we are operating under at the moment is that ", ". If we’re wrong, it could significantly impact the business because ","."] },
    { parts: ["Until now we’ve been able to ", ". Now, because ", " it will be necessary to change our approach to something more ", " and less ","."] },
    { parts: ["It is vital to start laying the groundwork for ", ". In the near-term we can get away with not ", ". But it will eventually come back to bite us."] },
    { parts: ["A key part of our strategy is to ignore ", " despite pressure to ", ". This will be challenging because ", " but ultimately we believe it will pay off because ", "."] },
    { parts: ["Pundits believe that ", ". They’re right that ", " but I believe they are wrong about ", " because they are missing the insight that ","."] },
    // Add more prompts here as necessary
];

// Function to select a random prompt
function getRandomPrompt() {
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    return prompt;
}

// Get reference to "Copy Text" button
const copyButton = document.getElementById('copyButton');

// Function to display a prompt
function displayPrompt() {
    const prompt = getRandomPrompt();
    const promptContainer = document.getElementById("prompt");
    promptContainer.innerHTML = '';

    copyButton.disabled = true;
    copyButton.classList.remove('enabled');    // remove the 'enabled' class
    copyButton.classList.add('disabled');      // add the 'disabled' class
    // copyButton.style.backgroundColor = "grey";
    // copyButton.style.color = "white";
	
	for (let i = 0; i < prompt.parts.length; i++) {
	    const partSpan = document.createElement('span');
	    partSpan.textContent = prompt.parts[i];

	    if (i === prompt.parts.length - 1 && prompt.parts[i].slice(-1) === '.') {
	      promptContainer.appendChild(partSpan);
	      continue;
	    }

	    const input = document.createElement('div');
	    input.contentEditable = true;
	    input.className = 'input-prompt';
	    input.textContent = '';
	
	    input.addEventListener('input', function() {
	        const inputs = document.querySelectorAll('.input-prompt');
	        const allFilled = Array.from(inputs).every(input => input.textContent.length > 0);
		    copyButton.disabled = !allFilled;
		    if (allFilled) {
		        copyButton.classList.remove('disabled');  // remove the 'disabled' class
		        copyButton.classList.add('enabled');      // add the 'enabled' class
		    } else {
		        copyButton.classList.add('disabled');     // add the 'disabled' class
		        copyButton.classList.remove('enabled');   // remove the 'enabled' class
		    }
	    });

	    promptContainer.appendChild(partSpan);
	    if (i < prompt.parts.length - 1 || (i === prompt.parts.length - 1 && prompt.parts[i].slice(-1) !== '.')) {
	      promptContainer.appendChild(input);
	    }
	}
    const firstInput = document.querySelector('.input-prompt');
    if (firstInput) {
        firstInput.focus();
    }
}

function autoResizeInput(event) {
    const target = event.target;
    const initialWidth = parseInt(getComputedStyle(target).getPropertyValue('width'), 10);
    const computedStyle = window.getComputedStyle(target);
    target.style.width = '0px';

    const calculatedWidth = Math.max(10, target.scrollWidth) + 1 + "px";  // 10 is the minimum width in 'ch'
    target.style.width = calculatedWidth;
}

function clearText() {
    const inputs = document.querySelectorAll('.input-prompt');
    inputs.forEach(input => {
        input.textContent = '';
        input.style.width = '10ch';
    });

    copyButton.disabled = true;
    copyButton.style.backgroundColor = "grey";
    copyButton.style.color = "white";
}

function copyTextToClipboard() {
  // Get the prompt and user input
  const promptContainer = document.getElementById('prompt');
  const inputFields = promptContainer.querySelectorAll('.input-prompt');
  let textToCopy = '';
  promptContainer.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('input-prompt')) {
      textToCopy += node.textContent;
    } else {
      textToCopy += node.textContent;
    }
  });

  // Create a temporary input element to hold the text
  const tempInput = document.createElement('textarea');
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select and copy the text
  tempInput.select();
  document.execCommand('copy');

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Provide user feedback or perform any additional actions
  console.log('Text copied to clipboard:', textToCopy);
}

// Function to copy the prompt to clipboard with "____________________" as delimiter
function copyPromptToClipboard() {
  const promptContainer = document.getElementById('prompt');
  let textToCopy = '';
  
  // Use Array.from to convert the childNodes NodeList to an array
  // Use Array.filter to get only the span elements (which contain the prompt parts)
  // Use Array.map to get the textContent of each span
  // Use Array.join to concatenate the prompt parts into a string with "____________________" as delimiter
  textToCopy = Array.from(promptContainer.childNodes)
    .filter(node => node.nodeName.toLowerCase() === 'span')
    .map(node => node.textContent)
    .join("____________________");

  // Create a temporary input element to hold the text
  const tempInput = document.createElement('textarea');
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);

  // Select and copy the text
  tempInput.select();
  document.execCommand('copy');

  // Remove the temporary input element
  document.body.removeChild(tempInput);

  // Provide user feedback or perform any additional actions
  console.log('Prompt copied to clipboard:', textToCopy);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        displayPrompt();
    }
});

// Add an event listener to the "Copy Prompt" button
document.getElementById("copyPrompt").addEventListener("click", copyPromptToClipboard);

copyButton.addEventListener('click', copyTextToClipboard);

// Display a prompt when the page loads
displayPrompt();

// Display a new prompt when the "New Prompt" button is clicked
document.getElementById("newPrompt").addEventListener("click", displayPrompt);