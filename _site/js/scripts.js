    function addHeart() {
      var el = document.getElementById('form-submit');
      el.classList.toggle("clicked");
      setTimeout(removeHeartOpenModal, 1500);
      }

    function removeHeartOpenModal() {
      document.getElementById('form-submit').classList.remove("clicked");        
      var modal = document.querySelector(".modal");
      var modalOverlay = document.querySelector("#modal-overlay");
      var closeButton = document.querySelector("#close-button");
      var openButton = document.querySelector("#mc-embedded-subscribe");
      
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
        closeButton.classList.toggle("closed");
      }

      closeButton.addEventListener("click", function() {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
        closeButton.classList.toggle("closed");
      });

      modal.addEventListener("click", function() {
        modalOverlay.classList.toggle("closed");
        closeButton.classList.toggle("closed");
        modal.classList.toggle("closed");
      });

      modalOverlay.addEventListener("click", function() {
        modal.classList.toggle("closed");
        modalOverlay.classList.toggle("closed");
        closeButton.classList.toggle("closed");
      });
