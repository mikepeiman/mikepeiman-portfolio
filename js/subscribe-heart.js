                <script>
                    function addHeart() {
                      var el = document.getElementById('form-submit');
                      el.classList.toggle("clicked");
                      setTimeout(removeHeart, 1000);
                      }

                    function removeHeart() {
                      document.getElementById('form-submit').classList.remove("clicked");
                      }
                </script>