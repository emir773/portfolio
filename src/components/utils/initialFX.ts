import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Split text animations
  const landingText = splitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    "chars"
  );
  gsap.fromTo(
    landingText,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const landingText2 = splitText(".landing-h2-info", "chars");
  gsap.fromTo(
    landingText2,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = splitText(".landing-h2-info-1", "chars");
  const landingText4 = splitText(".landing-h2-1", "chars");
  const landingText5 = splitText(".landing-h2-2", "chars");

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function splitText(selector: string | string[], type: 'words' | 'chars' | 'lines'): HTMLElement[] {
  const elements = typeof selector === 'string' 
    ? document.querySelectorAll(selector)
    : selector.map(s => document.querySelectorAll(s)).flat();
  
  const results: HTMLElement[] = [];
  elements.forEach(element => {
    if (element instanceof HTMLElement) {
      const text = element.textContent || '';
      const wrapper = document.createElement('div');
      wrapper.className = 'split-wrapper';
      
      if (type === 'words') {
        const words = text.split(' ');
        words.forEach(word => {
          const span = document.createElement('span');
          span.className = 'split-word';
          span.textContent = word + ' ';
          wrapper.appendChild(span);
        });
      } else if (type === 'chars') {
        const chars = text.split('');
        chars.forEach(char => {
          const span = document.createElement('span');
          span.className = 'split-char';
          span.textContent = char;
          wrapper.appendChild(span);
        });
      } else if (type === 'lines') {
        const lines = text.split('\n');
        lines.forEach(line => {
          const div = document.createElement('div');
          div.className = 'split-line';
          div.textContent = line;
          wrapper.appendChild(div);
        });
      }
      
      element.textContent = '';
      element.appendChild(wrapper);
      results.push(...Array.from(wrapper.children) as HTMLElement[]);
    }
  });
  return results;
}

function LoopText(Text1: HTMLElement[], Text2: HTMLElement[]) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
