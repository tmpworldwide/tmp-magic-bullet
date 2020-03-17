/*

  System Alert
  Developer: Michael "Spell" Spellacy, Email: michael.spellacy@tmp.com, Twitter: @spellacy, GitHub: michaelspellacy

*/

(function() {

  var magicBulletScript = document.getElementById("tmp-magic-bullet");
  var alertBody = document.body;

  // Data Attributes

  var alertCloseButtonText = magicBulletScript.getAttribute("data-alert-close-button-text");
  var alertMessage = magicBulletScript.getAttribute("data-alert-message");
  var alertDomainName = magicBulletScript.getAttribute("data-alert-domain");
  var alertLanguage =  magicBulletScript.getAttribute("data-alert-language");
  var alertCovid =  magicBulletScript.getAttribute("data-alert-covid");
  // var alertFontSize = magicBulletScript.getAttribute("data-alert-font-size");
  // var alertBackgroundColor = magicBulletScript.getAttribute("data-alert-background-color");
  // var alertTextColor = magicBulletScript.getAttribute("data-alert-text-color");
  // var alertModalzIndex = magicBulletScript.getAttribute("data-alert-modal-zindex");

  // Add alert hook for implementation team. May come in handy.

  alertBody.classList.add("magic-bullet-alert");

  // Helper: Get Cookie(s)

  function getCookie(name) {

    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value !== null) ? unescape(value[1]):null;

  }

  function setBanner() {

    var expDate = new Date();

    expDate.setDate(expDate.getDate() + 30);

    // Get custom domain name, if not present, then load in default domain.

    if(alertDomainName !== null) {

      // Expires (Future Enhancement):

      // document.cookie = "AlertDisplayed=true; expires=" + expDate + "; domain=" + alertDomainName + "; path=/";

      // Session:

      document.cookie = "AlertDisplayed=true; domain=" + alertDomainName + "; path=/";

    } else {

      // Expires (Future Enhancement):

      // document.cookie = "AlertDisplayed=true; expires=" + expDate + "; path=/";

      // Session:

      document.cookie = "AlertDisplayed=true; path=/";

    }

  }

  // Let's get our cookies...

  var alertDisplayed = getCookie("AlertDisplayed");

  if (alertDisplayed === null) {

    setBanner();

  }

  // Remove Alert

  var removeAlert = function() {

    // Remove Alert

    alertBody.removeChild(alertContainer);
    alertBody.classList.remove("system-alert-active");

  };

  // Languages

  if (alertLanguage === "es") {

    // Spanish

    var alertCloseBtn = "Cerca";

    var alertCovidMessage = "<p>La salud y seguridad de nuestros empleados y candidatos es muy importante para nosotros. Debido a la situación actual relacionada con el Coronavirus (COVID-19), estamos aprovechando nuestras capacidades digitales para garantizar que podamos continuar reclutando a los mejores talentos.</p> <p>A medida que avanza su solicitud, es posible que se le solicite que use una de nuestras herramientas digitales para ayudarlo en su viaje de reclutamiento. Si es así, uno de nuestros colegas de Recursos le explicará cómo se utilizará nuestra tecnología de video-entrevista durante todo el proceso de reclutamiento y estará disponible para responder cualquier pregunta que pueda tener.</p>";

  } else {

    // English (Default)

    var alertCloseBtn = "Close";

    var alertCovidMessage = "<p>The health and safety of our employees and candidates is very important to us. Due to the current situation related to the Coronavirus (COVID-19), we're leveraging our digital capabilities to ensure we can continue to recruit top talent.</p> <p>As your application progresses, you may be asked to use one of our digital tools to help you through your recruitment journey. If so, one of our colleagues will explain how these tools will be used throughout the recruitment process and will be on hand to answer any questions you might have.</p>";

  }

  // Only load banner if banner has NEVER been displayed before.

  if(alertDisplayed === null) {

    alertBody.classList.add("system-alert-active");

    // Create Alert

    var alertContainer = document.createElement("div");

    // Set Alert Attributes

    alertContainer.setAttribute("id", "system-alert");

    /* if (alertNoticeColor !== null) {

      alertContainer.style.setProperty ("background-color", alertNoticeColor);

    }

    if (alertNoticeColorText !== null) {

      alertContainer.style.setProperty ("color", alertNoticeColorText);

    }

    if (alertFontSize !== null) {

      alertContainer.style.setProperty ("font-size", alertFontSize, "important");

    }

    if (alertTextAlign !== null) {

      alertContainer.style.setProperty ("text-align", alertTextAlign);

    }

    if (alertzIndex !== null) {

      alertContainer.style.setProperty ("z-index", alertzIndex);

    } */

    // Now create the element...

    var alertContent = document.createElement("div");
    alertContent.setAttribute("id", "system-message");
    alertContent.setAttribute("role", "dialog");
    alertContent.setAttribute("aria-modal", "true");
    // alertContent.classList.add("hidden");

    // Add custom message if present...

    if (alertCovid !== null) {

      alertContent.innerHTML = alertCovidMessage;

    } else {

      if (alertMessage !== null) {

        alertContent.innerHTML = alertMessage;

      } else {

        alertContent.innerHTML = "Please add a message using <b>data-alert-message</b>. Thanks!";

      }

    }

    alertContainer.appendChild(alertContent);

    // Create Alert Button

    var alertButton = document.createElement("button");

    // Set Alert Button Attributes

    alertButton.setAttribute("id", "alert-button");

    // Add Close Button Text

    if (alertCloseButtonText !== null) {

      alertButtonText = alertCloseButtonText;

    } else {

      alertButtonText = alertCloseBtn;

    }

    alertButton.textContent  = alertButtonText;

    /* if (alertButtonColor !== null) {

      alertButton.style.setProperty ("background-color", alertButtonColor, "important");

    }

    if (alertButtonColorText !== null) {

      alertButton.style.setProperty ("color", alertButtonColorText, "important");

    } */

    // Append Alert Button to Alert Dialog

    alertContent.appendChild(alertButton);

    // Prepend Alert to Body Element

    alertBody.insertBefore(alertContainer, alertBody.childNodes[0] || null);

    // Apply focus to close button

    alertButton.focus();

    var systemMessage = document.getElementById("system-message");

    trapFocus(systemMessage);

    /******* Consent Types *********/

    // Button Consent

    alertButton.onclick = function(){

      removeAlert();

      return false;

    };

  }

  // Escape Key

  window.onkeyup = function (event) {

    if (event.keyCode == 27) {

      removeAlert();

    }

  }

  // Trap Focus

  function trapFocus(element, namespace) {

    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'),

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    KEYCODE_TAB = 9;

    element.addEventListener('keydown', function(e) {

      var isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

      if (!isTabPressed) {

        return;

      }

      if ( e.shiftKey ) /* shift + tab */ {

        if (document.activeElement === firstFocusableEl) {

          lastFocusableEl.focus();

          e.preventDefault();

        }

      } else {

        // Tab

        if (document.activeElement === lastFocusableEl) {

          firstFocusableEl.focus();

          e.preventDefault();

        }

      }

    });

  }

})();