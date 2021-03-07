import spriteRunningAliceQueenSmall from "./img/sprite_running-alice-queen_small.png"
import palm3Small from "./img/palm3_small.png"
import bushSmall from "./img/bush_small.png";
import wRookUprightSmall from "./img/w_rook_upright_small.png";
import rPawnUprightSmall from "./img/r_pawn_upright_small.png";
import wRookSmall from "./img/w_rook_small.png";
import palm1Small from "./img/palm1_small.png";
import rPawnSmall from "./img/r_pawn_small.png";
import rKnightSmall from "./img/r_knight_small.png";
import palm2Small from "./img/palm2_small.png";

import './App.css';

import useWebAnimations from "@wellyshen/use-web-animations";
import { useEffect } from "react";


function App() {

  const sceneryFrames = [
    { transform: 'translateX(100%)' },
    { transform: 'translateX(-100%)' }
  ];

  const sceneryTimingBackground = {
    duration: 36000,
    iterations: Infinity
  };

  const sceneryTimingForeground = {
    duration: 12000,
    iterations: Infinity
  };

  const background1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const background2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingBackground
  })

  const foreground1Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const foreground2Movement = useWebAnimations({
    keyframes: sceneryFrames,
    timing: sceneryTimingForeground
  })

  const spriteFrames = [
    { transform: 'translateY(0)' },
    { transform: 'translateY(-100%)' }
  ];

  const spriteTiming = {
    easing: 'steps(7, end)',
    direction: "reverse",
    duration: 600,
    playbackRate: 1,
    iterations: Infinity
  }

  const redQueen_alice = useWebAnimations({
    keyframes: spriteFrames,
    timing: spriteTiming
  })

  /* Alice tires so easily! 
    Every so many seconds, reduce their playback rate so they slow a little. 
  */
  const sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

  const adjustBackgroundPlayback = function () {
    const animationRedQueenAlice = redQueen_alice.getAnimation();
    if (animationRedQueenAlice.playbackRate < .8) {
      sceneries.forEach(function (anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = animationRedQueenAlice.playbackRate / 2 * -1;
      });
    } else if (animationRedQueenAlice.playbackRate > 1.2) {
      sceneries.forEach(function (anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = animationRedQueenAlice.playbackRate / 2;
      });
    } else {
      sceneries.forEach(function (anim) {
        const animation = anim.getAnimation();
        animation.playbackRate = 0;
      });
    }
  }

  const goFaster = function () {
    /* But you can speed them up by giving the screen a click or a tap. */
    redQueen_alice.getAnimation().playbackRate *= 1.1;
    adjustBackgroundPlayback();
  }

  useEffect(() => {

    console.log('UseEffect')

    const animationBg1 = background1Movement.getAnimation();
    animationBg1.currentTime = animationBg1.effect.getComputedTiming().duration / 2;

    const animationFg1 = foreground1Movement.getAnimation();
    animationFg1.currentTime = animationFg1.effect.getComputedTiming().duration / 2;

    adjustBackgroundPlayback();
    
    /* If Alice and the Red Queen are running at a speed of 1, the background doesn't move. */
    /* But if they fall under 1, the background slides backwards */
    let interval = setInterval(() => {

      console.log('tick', (new Date()).getSeconds())
      /* Set decay */
      const animationRedQueenAlice = redQueen_alice.getAnimation();
      if (animationRedQueenAlice.playbackRate > .4) {
        animationRedQueenAlice.playbackRate *= .9;
      }
      adjustBackgroundPlayback();

    }, 3000);

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

    return () => {
      console.log('clear interval')
      clearInterval(interval)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" src={spriteRunningAliceQueenSmall}
            alt="Alice and the Red Queen running to stay in place." ref={redQueen_alice.ref} />
        </div>
      </div>

      <div className="scenery" id="foreground1" ref={foreground1Movement.ref}>
        <img id="palm3" src={palm3Small} alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={foreground2Movement.ref}>
        <img id="bush" src={bushSmall} alt=" " />
        <img id="w_rook_upright" src={wRookUprightSmall} alt=" " />
      </div>
      <div className="scenery" id="background1" ref={background1Movement.ref}>
        <img id="r_pawn_upright" src={rPawnUprightSmall} alt=" " />
        <img id="w_rook" src={wRookSmall} alt=" " />
        <img id="palm1" src={palm1Small} alt=" " />
      </div>
      <div className="scenery" id="background2" ref={background2Movement.ref}>
        <img id="r_pawn" src={rPawnSmall} alt=" " />

        <img id="r_knight" src={rKnightSmall} alt=" " />
        <img id="palm2" src={palm2Small} alt=" " />
      </div>
    </div>
  );
}

export default App;
