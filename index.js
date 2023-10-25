// Декоратор @ColorPlayer
export function ColorPlayer(initialColor, callback) {
  return function (target) {
    target.prototype._color = initialColor;
    target.prototype._callback = callback;

    const originalMethods = Object.getOwnPropertyNames(target.prototype);

    for (const methodName of originalMethods) {
      if (methodName.startsWith("play")) {
        const originalMethod = target.prototype[methodName];

        target.prototype[methodName] = function (octave) {
          const colorParts = this._color.split(" ");
          const lIndex = colorParts.findIndex((part) => part.includes("L"));
          const cIndex = colorParts.findIndex((part) => part.includes("C"));

          if (lIndex !== -1) {
            const lValue = parseFloat(colorParts[lIndex]);
            const octaveDiff = octave - 3;
            const newL = lValue + octaveDiff * 10;
            this._color = this._color.replace(
              `L ${lValue}%`,
              `L ${clamp(newL, 0, 100).toFixed(2)}%`
            );
          }

          if (cIndex !== -1) {
            const cValue = parseFloat(colorParts[cIndex]);
            const octaveDiff = octave - 3;
            const newC = cValue + octaveDiff * 0.11;
            this._color = this._color.replace(
              `C ${cValue}`,
              `C ${clamp(newC, 0, 0.37).toFixed(2)}`
            );
          }

          this._callback(this._color);

          originalMethod.call(this, octave);
        };
      }
    }
  };
}

// Декоратор @Color
export function Color(component, coeff) {
  return function (target, propertyKey, descriptor) {
    // Этот декоратор не требует действий, так как все изменения
    // делаются в декораторе @ColorPlayer.
  };
}
