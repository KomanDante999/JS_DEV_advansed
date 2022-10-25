function onButton() {
  this.textContent = String(Number(this.textContent) + 1);
}
for (let i = 0; i < 5; ++i) {
  const btn = document.createElement('button');
  btn.textContent = '1'
  document.body.append(btn);
  btn.addEventListener('click', onButton);
}
