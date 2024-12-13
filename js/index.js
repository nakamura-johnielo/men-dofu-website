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
  ];
  document.getElementById("this-container").style.height =
    (sectionLength + transitionLength) * anmSections.length +
    transitionOffset +
    "px";

  anmSections[0].style.opacity = "1";

  window.addEventListener("scroll", () => {
    const display = window.scrollY;
    console.log("scrollini:" + scrollini);
    console.log("display:" + display);
    const distance = display - scrollini;
    animateTransition(distance, anmSections);
  });
}

//####################################
animateAllTransitions();
