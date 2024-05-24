const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  
  if (!res.ok) throw Error("Failed getting menu");

  let { data } = await res.json();
  data.forEach(item => item.unitPrice = item.unitPrice*20)
  console.log(data)
  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  let { data } = await res.json();
  console.log(data.cart);
  data.orderPrice = data.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  data.priorityPrice = data.priority ? 45 : 0;
  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    let { data } = await res.json();
    console.log("API Call Start");
    console.log(data.cart);
    data.orderPrice = data.cart.reduce((sum, item) => sum + item.totalPrice, 0);;
    data.priorityPrice = data.priority ? 45 : 0;
    console.log("D:",data)
    console.log("API Call end");

    return data;
  } catch {
    throw Error("Failed creating your order");
  }
}

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
  } catch (err) {
    throw Error("Failed updating your order");
  }
}
