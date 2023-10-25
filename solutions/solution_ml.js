/**
 * @param {number} max
 * @returns {number} - случайное целое число в диапазоне [0; max)
 */
function random(max) {
  return Math.trunc(Math.random() * max);
}

function createRandomizer(xMax, yMax) {
  const points = Array.from({ length: 100_000 }, (_) => [
    random(xMax),
    random(yMax),
  ]);
  /**
   * @returns {[number, number]} - случайная точка в прямоугольнике
   */
  const getRandom = function getRandom() {
    return [random(xMax), random(yMax)];
  };
  return getRandom; // Возвращаем функцию getRandom
}

/**
 * Рисование случайных прямоугольников
 *
 * @param {number} N количество прямоугольников
 * @param {number} xMax максимальная координата x
 * @param {number} yMax максимальная координата y
 * @returns {Array}
 */
function draw(N, xMax, yMax) {
  const result = [];
  for (let i = 0; i < N; i++) {
    const getRandom = createRandomizer(xMax, yMax); // Получаем функцию getRandom
    const [x1, y1] = getRandom();
    const [x2, y2] = getRandom();
    result.push([
      [x1, y1],
      [x1, y2],
      [x2, y2],
      [x2, y1],
    ]);
  }
  return result;
}

module.exports = { draw };
