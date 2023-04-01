import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Image,
} from "react-native";

import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SHOW_TOAST_MESSAGE } from "./ToastFile";

const colors = {
  info: "#D1A1A1",
  success: "#163D42",
};

const Toast = () => {
  const [messageType, setMessageType] = useState(null);
  //   console.log(messageType);
  const timeOutRef = useRef(null);

  const animatedOpacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
      transform: [
        {
          translateY: animatedOpacity.value * 10,
        },
      ],
    };
  }, []);

  const [timeOutDuration, setTimeOutDuration] = useState(5000);

  const [message, setMessage] = useState(null);
  const [icon, seticon] = useState(null);
  const [Fonts, setFonts] = useState(null);
  const onNewToast = (data) => {
    if (Platform.OS === "android" && data.useNativeToast) {
      return ToastAndroid.show(data.message, ToastAndroid.LONG);
    }
    if (data.duration) {
      setTimeOutDuration(data.duration);
    }
    setMessage(data.message);
    seticon(data.icon);
    setFonts(data.Fonts);
    setMessageType(data.type);
  };

  const closeToast = useCallback(() => {
    setMessage(null);
    seticon(null);
    setFonts(null);
    setTimeOutDuration(5000);
    animatedOpacity.value = withTiming(0);
    clearInterval(timeOutRef.current);
  }, [animatedOpacity]);

  useEffect(() => {
    //  console.log('GetMessage', message);
    if (message && icon && Fonts) {
      timeOutRef.current = setInterval(() => {
        if (timeOutDuration === 0) {
          closeToast();
        } else {
          setTimeOutDuration((prev) => prev - 1000);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timeOutRef.current);
    };
  }, [closeToast, message, timeOutDuration, icon, Fonts]);

  useEffect(() => {
    if (message && icon && Fonts) {
      animatedOpacity.value = withTiming(1, { duration: 1000 });
    }
  }, [message, animatedOpacity, icon, Fonts]);

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);

    return () => {
      DeviceEventEmitter.removeAllListeners();
    };
  }, []);

  if (!message && !icon && !Fonts) {
    return null;
  }

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          // alignItems: 'center',
          justifyContent: "center",
          // bottom: '4%',
          top: "3%",
          left: "4%",
          right: "4%",
          backgroundColor: colors[messageType],
          zIndex: 1,
          elevation: 1,
          height: 48,
          borderRadius: 10,
        },
        animatedStyle,
      ]}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          // padding: 10,
          alignItems: "center",
          marginStart: 10,
          // justifyContent: 'center',
        }}
        onPress={closeToast}
      >
        <Image
          resizeMode="contain"
          source={icon}
          style={{
            width: 24,
            height: 24,
          }}
        />
        <Text
          allowFontScaling={false}
          style={{
            color: "white",
            fontSize: 14,
            marginStart: 8,
            marginTop: -3,

            fontFamily: Fonts,
          }}
        >
          {message}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
