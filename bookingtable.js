 // Set min date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
 
    // Set default time to next hour
    const now = new Date();
    now.setHours(now.getHours() + 1, 0, 0, 0);
    document.getElementById('time').value =
      now.getHours().toString().padStart(2,'0') + ':00';
 
    // Guest counter
    function changeGuests(delta) {
      const inp = document.getElementById('guests');
      const val = parseInt(inp.value) + delta;
      if (val >= 1 && val <= 20) inp.value = val;
    }
 
    // Copy mobile → whatsapp
    function copyMobile(cb) {
      const wa = document.getElementById('whatsapp');
      if (cb.checked) {
        wa.value = document.getElementById('mobile').value;
        wa.readOnly = true;
        wa.style.opacity = '0.5';
      } else {
        wa.readOnly = false;
        wa.style.opacity = '1';
      }
    }
 
    // Keep in sync while typing
    document.getElementById('mobile').addEventListener('input', function() {
      if (document.getElementById('sameNum').checked) {
        document.getElementById('whatsapp').value = this.value;
      }
    });
 
    // Submit
    function handleSubmit(e) {
      e.preventDefault();
 
      // basic validation
      const name     = document.getElementById('name').value.trim();
      const mobile   = document.getElementById('mobile').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const date     = document.getElementById('date').value;
      const time     = document.getElementById('time').value;
      const guests   = document.getElementById('guests').value;
      const table    = document.getElementById('table').value || 'No preference';
      const occasion = document.getElementById('occasion').value || 'Not specified';
      const note     = document.getElementById('note').value.trim() || 'None';
 
      if (!name || !mobile || !date || !time) {
        alert('Please fill in all required fields (Name, Mobile, Date, Time).');
        return;
      }
 
      // Format date nicely
      const dateObj = new Date(date);
      const dateStr = dateObj.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
 
      // Format time nicely
      const [h, m] = time.split(':');
      const hr = parseInt(h);
      const timeStr = `${hr > 12 ? hr-12 : hr}:${m} ${hr >= 12 ? 'PM' : 'AM'}`;
 
      // Build WhatsApp message
      const msg =
`🍽️ *New Table Booking — Virat Cafe & Restaurant*
 
👤 *Guest Name:* ${name}
📅 *Date:* ${dateStr}
🕐 *Time:* ${timeStr}
👥 *Guests:* ${guests}
🪑 *Table Preference:* ${table}
🎉 *Occasion:* ${occasion}
 
📞 *Call No:* +91 ${mobile}
💬 *WhatsApp No:* +91 ${whatsapp || mobile}
 
📝 *Special Requests:* ${note}
 
_Booking submitted via website._`;
 
      // Show success state on button
      const btn = document.querySelector('.btn-submit');
      btn.innerHTML = '<i class="fa fa-check-circle"></i> Opening WhatsApp...';
      btn.style.background = 'linear-gradient(135deg,#1a4a1e,#25a040)';
      btn.style.color = '#fff';
      btn.disabled = true;
 
      // Show toast
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);
 
      // Open WhatsApp after short delay
      setTimeout(() => {
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/917300479727?text=${encoded}`, '_blank');
      }, 600);
    }