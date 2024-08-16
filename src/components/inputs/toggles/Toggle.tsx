import * as RadixToggle from '@radix-ui/react-toggle';
import { useState } from 'react';

function Toggle({
  pressedIcon,
  defaultIcon,
  onPress,
}: {
  pressedIcon: React.ReactNode;
  defaultIcon: React.ReactNode;
  onPress: (b: boolean) => void;
}) {
  const [pressed, setPressed] = useState(false);

  function handlePress(b: boolean) {
    setPressed(b);
    onPress(b);
  }

  return (
    <RadixToggle.Root
      pressed={pressed}
      onPressedChange={(b) => handlePress(b)}
      className="color-matrix cursor-pointer rounded-lg border-2 border-matrix bg-matrix p-2.5"
      aria-label="Toggle italic"
    >
      {pressed ? pressedIcon : defaultIcon}
    </RadixToggle.Root>
  );
}

export default Toggle;
