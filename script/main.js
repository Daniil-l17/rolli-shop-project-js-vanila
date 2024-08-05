const plus = document.querySelectorAll('[data-action=plus]')
const minus = document.querySelectorAll('[data-action=minus]')
const addItem = document.querySelectorAll('.btn-outline-warning')
const wrapper = document.querySelector('.cart-wrapper')
const totalPrice = document.querySelector('.total-price')
const alertCart = document.querySelector('.alert-secondary')
console.log(alertCart);

function proverkaCartlength() {
  const wrap = document.querySelectorAll('.cart-item')
  if (wrap.length) {
    alertCart.style.display = 'none'
  } else {
    alertCart.style.display = 'block'
  }
}



function culculute(price) {
  const wrap = document.querySelectorAll('.cart-item')
  const array = Array.from(wrap)
  const value = array.reduce((acc, cur) => {
    return acc = acc + +cur.querySelector('.items__current').innerText * parseInt(price)
  }, 0)
  proverkaCartlength()
  totalPrice.innerText = value
}

function proverka(obj) {
  const wrap = document.querySelectorAll('.cart-item')
  const array = Array.from(wrap)
  if (array.some(item => item.dataset.id === obj.id)) {
    const elementlll = wrapper.querySelector(`[data-id="${obj.id}"]`).querySelector('.items__current')
    elementlll.innerText = +elementlll.innerText + +obj.count
  } else {
    wrapper.insertAdjacentHTML('beforeend', `
      <div class="cart-item" data-id=${obj.id} >
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${obj.img}" alt="">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${obj.title}</div>
										<div class="cart-item__weight">6 шт. / ${obj.weight} </div>

										<!-- cart-item__details -->
										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${obj.count}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${obj.price} </div>
											</div>

										</div>
										<!-- // cart-item__details -->

									</div>
								</div>
							</div>
      `)
  }
  /*culculute(obj)*/
}


document.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'minus') {
    if (e.target.closest('.cart-wrapper')) {
      const item = e.target.closest('.counter-wrapper')
      const counter = item.querySelector('.items__current')
      const price = e.target.closest('.cart-item').querySelector('.price__currency')
      if (+counter.innerText <= 1) {
        e.target.closest('.cart-item').remove()
      } else {
        counter.innerText = +counter.innerText - 1
      }
      culculute(price.innerText)
    } else {
      const items = e.target.closest('.card')
      const counter = items.querySelector('.counter-wrapper').querySelector('.items__current')
      if (+counter.innerText > 1) {
        counter.innerText = +counter.innerText - 1
      }
    }
  }
})

document.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'plus') {
    if (e.target.closest('.cart-wrapper')) {
      const item = e.target.closest('.counter-wrapper')
      const counter = item.querySelector('.items__current')
      const price = e.target.closest('.cart-item').querySelector('.price__currency')
      counter.innerText = +counter.innerText + 1
      culculute(price.innerText)
    } else {
      const items = e.target.closest('.card')
      const counter = items.querySelector('.counter-wrapper').querySelector('.items__current')
      counter.innerText = +counter.innerText + 1
    }
  }
})

addItem.forEach((item) => {
  item.addEventListener('click', (event) => {
    const items = event.target.closest('.card')
    const obj = {
      img: items.querySelector('.product-img').src,
      id: items.dataset.id,
      title: items.querySelector('.item-title').innerText,
      count: items.querySelector('.items__current').innerText,
      price: items.querySelector('.price__currency').innerText,
      weight: items.querySelector('.price__weight').innerText,
    }
    proverka(obj)
    culculute(obj.price)
  })
})