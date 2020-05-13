import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

const FadeAnimContainer = (props) => {
  const fade_anim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  useEffect(() => {
    Animated.timing(fade_anim, {
      toValue: 1,
      duration: 1500,
    }).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={
        ([
          {
            opacity: fade_anim, // Bind opacity to animated value
          },
        ],
        props.style)
      }
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeAnimContainer;