/* const div_anm = document.getElementById("this");
//divの初期位置
const scrollini = div_anm.getBoundingClientRect().top;
const h = div_anm.getBoundingClientRect().height;
const anmSections = [
  document.getElementById("sec0"),
  document.getElementById("sec1"),
  document.getElementById("sec2"),
];

anmSections[0].style.opacity = "1";

window.addEventListener("scroll", () => {
  const display = window.pageYOffset;
  console.log("scrollini:" + scrollini);
  console.log("display:" + display);
  const distance = display - scrollini;

  if (distance >= 0 && distance <= rollLength - h) {
    if (distance <= 300) {
      animateOnSection0(distance);
      console.log("~300 ##############################");
    } else {
    }

    if (250 <= distance && 350) {
    }
  } else {
  }
});

function animateOnSection0(distance) {
  const div = document.getElementById("sec0");
  div.style.opacity = 1 - distance / 300;
}

function animateOnSection1(distance) {
  const div = document.getElementById("sec1");
  div.style.opacity = 1 - distance / 300;
} */

const rollLength = 4000;

const sectionLength = 500;
const transitionOffset = 150;
const transitionLength = 300;

function fade(i, distance, anmSections, sectionLLength) {
  /* 
    transitionLengthの中にheadとfootのinicialとend

                        ------------------------------------transitionLength: 切り替わりアニメーション範囲
          footInitial   opacity=1　でアニメーション開始         ↑  ↑
          ↕                                                   ↑  |transitionOffset: アニメーション長さ
          footEnd       opacity=0　でアニメーション終了         ↑　↓
                                                              ↑
    ^==== content ========================================    ↑
    v==== content ========================================    ↓
                                                              ↓
          headInitial   opacity=0　でアニメーション開始         ↓  ↑
          ↕                                                   ↓  |transitionOffset: アニメーション長さ
          headEnd       opacity=1　でアニメーション終了         ↓　↓
                        ------------------------------------transitionLength: 切り替わりアニメーション範囲
          　 ↕          opacity=1　で普通にコンテンツ表示    
            
          footInitial   opacity=1　でアニメーション開始
          ↕             transitionOffset: アニメーション長さ
          footEnd       opacity=0　でアニメーション終了

    ^==== content ========================================
  */

  const headInitial = (sectionLength + transitionLength) * i - transitionLength;
  const headEnd = (sectionLength + transitionLength) * i;
  const footInitial = (sectionLength + transitionLength) * i + sectionLength;
  //const footEnd = (sectionLength + transitionLength) * (i + 1);

  if (distance < headEnd) {
    // 出現するまでのアニメーション
    // 一個目のセクションは初めから表示
    if (i != 0) {
      anmSections[i].style.opacity =
        (distance - headInitial - transitionOffset) /
        (transitionLength - transitionOffset);
    }
  } else if (footInitial < distance) {
    // 消えるまでのアニメーション
    // 最後のセクションは消さない
    if (i != sectionLength - 1) {
      anmSections[i].style.opacity =
        1 - (distance - footInitial) / (transitionLength - transitionOffset);
    }
  } else {
    anmSections[i].style.opacity = 1;
  }
}

function animateTransition(distance, anmSections) {
  for (let i = 0; i < anmSections.length; i++) {
    fade(i, distance, anmSections, anmSections.length);
  }
}

function animateAllTransitions() {
  const div_anm = document.getElementById("this");
  //divの初期位置
  const scrollini = div_anm.getBoundingClientRect().top;
  const h = div_anm.getBoundingClientRect().height;
  const anmSections = [
    document.getElementById("sec0"),
    document.getElementById("sec1"),
    document.getElementById("sec2"),
    document.getElementById("sec3"),
  ];

  document.getElementById("this-container").style.height =
    (sectionLength + transitionLength) * anmSections.length +
    transitionOffset +
    "px";

  anmSections[0].style.opacity = "1";

  window.addEventListener("scroll", () => {
    const display = window.scrollY;
    //console.log("scrollini:" + scrollini);
    //console.log("display:" + display);
    const distance = display - scrollini;
    animateTransition(distance, anmSections);
  });
}

//####################################
animateAllTransitions();

//############
/* document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // アニメーション後に再度監視しない場合はコメントアウト
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".animate").forEach(function (element) {
    observer.observe(element);
  });
}); */

/* document.addEventListener("DOMContentLoaded", function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reverse");
          //entry.target.classList.remove("fadein-2right");
          entry.target.classList.add("fadein-2right");
        } else {
          entry.target.classList.add("reverse");
          entry.target.classList.remove("fadein-2right");
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(document.getElementById('sec0'));
  
}); */

function animateFades() {
  const buffer = 200;
  const screenHeight = window.innerHeight;

  const anmSections = [
    [
      document.getElementById("top-section-0"),
      document.getElementById("top-section-0").getBoundingClientRect().top,
      document.getElementById("top-section-0").getBoundingClientRect().height,
    ],
    [
      document.getElementById("top-section-1"),
      document.getElementById("top-section-1").getBoundingClientRect().top,
      document.getElementById("top-section-1").getBoundingClientRect().height,
    ],
    [
      document.getElementById("top-section-2"),
      document.getElementById("top-section-2").getBoundingClientRect().top,
      document.getElementById("top-section-2").getBoundingClientRect().height,
    ],
  ];

  console.log("top1: " + anmSections[0][1]);
  console.log("top2: " + anmSections[1][1]);
  console.log("top3: " + anmSections[2][1]);
  console.log("screen: " + screenHeight);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    console.log("scrollY: " + scrollY);
    console.log("scr+buf: " + (scrollY + buffer));
    console.log("sl+bf+h: " + (scrollY - buffer + screenHeight));

    for (let i = 0; i < anmSections.length; i++) {
      const element = anmSections[i][0];
      const top = anmSections[i][1];
      const height = anmSections[i][2];

      if (
        scrollY - (height * 2) / 3 /* +buffer */ <= top &&
        top <= scrollY + screenHeight - height / 4 /* - buffer */
      ) {
        //entry animation
        /*  element.classList.remove("fadein-2left");
        element.classList.remove("fadein-2right");
        element.classList.remove("fadein-center"); */
        console.log("######### entry:" + i);
        if (
          !element.classList.contains("fadein-2right") &&
          !element.classList.contains("fadein-2left") &&
          !element.classList.contains("fadein-center")
        ) {
          element.classList.remove("fadein-2right-reverse");
          element.classList.remove("fadein-2left-reverse");
          element.classList.remove("fadein-center-reverse");
          if (i == 0) {
            element.classList.add("fadein-2right");
          } else if (i == 1) {
            element.classList.add("fadein-2left");
          } else if (i == 2) {
            element.classList.add("fadein-center");
          }
        }
      } else {
        /*  */
        if (
          element.classList.contains("fadein-2right") ||
          element.classList.contains("fadein-2left") ||
          element.classList.contains("fadein-center")
        ) {
          element.classList.remove("fadein-2right-reverse");
          element.classList.remove("fadein-2left-reverse");
          element.classList.remove("fadein-center-reverse");
          if (i == 0) {
            element.classList.add("fadein-2right-reverse");
          } else if (i == 1) {
            element.classList.add("fadein-2left-reverse");
          } else if (i == 2) {
            element.classList.add("fadein-center-reverse");
          }
          element.classList.remove("fadein-2left");
          element.classList.remove("fadein-2right");
          element.classList.remove("fadein-center");
        }

        console.log("********** exit:" + i);
      }
    }

    //console.log("scrollini:" + scrollini);
    //console.log("display:" + display);
    //const distance = display - scrollini;
    //animateTransition(distance, anmSections);
  });
}

animateFades();

//################
var isOnAnimated = false;
var isInMenubar = false;
function animateLogo2Menu() {
  const logo = document.getElementById("logo");
  const logoImg = document.getElementById("logo-img");
  const menuBar = document.getElementById("menu-bar");
  const screenHeight = window.innerHeight;
  //text-4xl
  /* div.style.letterSpacing ="0.3em";
  div.style.fontSize = "2.25rem";
  div.style.lineHeight = "2.5rem"; */

  breakPoint = screenHeight / 4;
  const menuLogo = document.getElementById("logo2");
  const menuLogoPos = [
    menuLogo.getBoundingClientRect().top,
    menuLogo.getBoundingClientRect().left,
  ];

  const logoPos = [
    logo.getBoundingClientRect().top,
    logo.getBoundingClientRect().left,
  ];

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY <= breakPoint) {
      //logo.style.opacity = "1";
      //menuLogo.style.opacity = "0";
      if (isInMenubar) {
        //div.classList.add("onAnimated");
        //isOnAnimated = true;
        //メニューバーの位置に一度移動済み
        //heroページのポジションに戻る

        menuBar.classList.remove("fadein-menubar");
        menuBar.classList.remove("fadeout-menubar");
        menuBar.classList.add("fadeout-menubar");
        logo
          .animate(
            [
              {
                transform: `translate(${logoPos[1] - logo.offsetLeft}px, ${
                  /* logoPos[0] - div.offsetTop */ 0
                }px)`,
              },
            ],
            {
              delay: 400,
              duration: 500, // アニメーションの持続時間 (ms)
              easing: "cubic-bezier(0.895, -0.005, 0.465, 1.005)",
              fill: "forwards",
            }
          )
          .finished.then(() => {
            // アニメーションが終了した後に次のアクションを実行
            //div.classList.remove("onAnimated");
            //isOnAnimated = false;
            isInMenubar = false;
          });
      }
      //text-4xl → text-xl
      //font-size: 2.25rem;line-height: 2.5rem;
      //font-size: 1.25rem;line-height: 1.75rem;
      // スケール小さく
      const scale = (breakPoint - scrollY) / breakPoint;
      logo.style.letterSpacing = 0.1 + 0.2 * scale + "em";
      logo.style.fontSize = 1.25 + scale + "rem";
      logo.style.lineHeight = 1.75 + 0.75 * scale + "rem";
      logoImg.style.paddingInline = 0.125 * (1 - scale) + "rem";
      logoImg.style.marginTop = 0.25 + 0.25 * scale + "rem";

      /* if (!isOnAnimated //i !div.classList.contains('onAnimated') 
      ) {
       //text-4xl → text-xl
      //font-size: 2.25rem;line-height: 2.5rem;
      //font-size: 1.25rem;line-height: 1.75rem;
      // スケール小さく
      const scale = (breakPoint - scrollY) / breakPoint;
      div.style.letterSpacing = 0.1 + 0.2 * scale + "em";
      div.style.fontSize = 1.25 + scale + "rem";
      div.style.lineHeight = 1.75 + 0.75 * scale + "rem";
      logoImg.style.paddingInline = 0.125 * (1 - scale) + "rem";
      logoImg.style.marginTop = 0.25 + 0.25 * scale + "rem";
           
      } */
    } else if (breakPoint < scrollY && scrollY < screenHeight) {
      const scale = 0;
      logo.style.letterSpacing = 0.1 + 0.2 * scale + "em";
      logo.style.fontSize = 1.25 + scale + "rem";
      logo.style.lineHeight = 1.75 + 0.75 * scale + "rem";
      logoImg.style.paddingInline = 0.125 * (1 - scale) + "rem";
      logoImg.style.marginTop = 0.25 + 0.25 * scale + "rem";
      if (!isInMenubar) {
        menuBar.classList.remove("fadein-menubar");
        menuBar.classList.remove("fadeout-menubar");
        menuBar.classList.add("fadein-menubar");
        logo
          .animate(
            [
              {
                transform: `translate(${menuLogoPos[1] - logo.offsetLeft}px, ${
                  /* menuLogoPos[0] - div.offsetTop */ 0
                }px)`,
              },
            ],
            {
              duration: 500, // アニメーションの持続時間 (ms)
              easing: "cubic-bezier(0.895, -0.005, 0.465, 1.005)",
              fill: "forwards",
            }
          )
          .finished.then(() => {
            isInMenubar = true;
            //menuLogo.style.opacity = "1";
            //logo.style.opacity = "0";
          });
      }
    }
  });
}

animateLogo2Menu();
