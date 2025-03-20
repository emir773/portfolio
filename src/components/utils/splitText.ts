import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
}

gsap.registerPlugin(ScrollTrigger);

function splitText(element: HTMLElement, type: 'words' | 'chars' | 'lines'): HTMLElement[] {
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
  return Array.from(wrapper.children) as HTMLElement[];
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }

    const words = splitText(para, 'words');
    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    const chars = splitText(title, 'chars');
    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
