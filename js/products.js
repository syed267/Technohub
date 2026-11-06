
function openEnquiry(productName) {
  // Set product data
  document.getElementById('enqProductTitle').innerText = productName;
  document.getElementById('enqProductInput').value = productName;
  document.getElementById('enqSubject').value = "New Enquiry - " + productName;
  document.getElementById('successProduct').innerText = productName;
  
  // Reset form view
  document.getElementById('enqFormWrap').style.display = 'block';
  document.getElementById('enqSuccessWrap').style.display = 'none';
  
  // Show modal
  document.getElementById('enquiryModal').classList.add('active');
  document.body.style.overflow = 'hidden'; // stop background scroll
}

function closeEnquiry() {
  document.getElementById('enquiryModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close on outside click
document.getElementById('enquiryModal').addEventListener('click', function(e) {
  if (e.target === this) closeEnquiry();
});

// Close on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeEnquiry();
});

async function submitEnquiry(e) {
  e.preventDefault();
  const phoneInput = document.getElementById('enqPhone');
  const phoneError = document.getElementById('phoneError');
  
  // Validate 10 digit phone
  if (!/^[0-9]{10}$/.test(phoneInput.value)) {
    phoneError.style.display = 'block';
    return;
  } else {
    phoneError.style.display = 'none';
  }

  const form = document.getElementById('enquiryForm');
  const submitBtn = form.querySelector('.enq-submit');
  submitBtn.innerText = 'Submitting...';
  submitBtn.disabled = true;

  const formData = new FormData(form);
  
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    
    if (data.success) {
      document.getElementById('enqFormWrap').style.display = 'none';
      document.getElementById('enqSuccessWrap').style.display = 'block';
      form.reset();
    } else {
      alert('Failed to submit. Please try again.');
    }
  } catch (error) {
    alert('Error submitting form.');
  } finally {
    submitBtn.innerText = 'Submit';
    submitBtn.disabled = false;
  }
}
