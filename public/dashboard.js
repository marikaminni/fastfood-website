async function deleteOrder(id) {
  try {
    const response = await fetch(`/orders?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting order");
    }
    const data = await response.json();
    console.log("Order deleted", data);
    return data;
  } catch (error) {
    console.error("Error in orders deletion:", error);
  }
}

async function updateOrderStatus(id, newstatus) {
  try {
    const response = await fetch(`/orders?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newstatus }),
    });

    if (!response.ok) {
      throw new Error("Error updating order status");
    }

    const data = await response.json();
    console.log("Status updated", data);
    return data;
  } catch (error) {
    console.error("Error in orders status update:", error);
  }
}

async function deleteBookings(id) {
  try {
    const response = await fetch(`/book-table?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting booking");
    }
    const data = await response.json();
    console.log("Booking deleted", data);
    return data;
  } catch (error) {
    console.error("Error in bookings deletion:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const orderbtn = document.querySelector("#orders");
  const bookingbtn = document.querySelector("#bookings");
  const dashboardbtn = document.querySelector("#dashboard");
  const bookingtable = document.querySelector("#bookings-table");
  const orderstable = document.querySelector("#orders-table");
  const dashboarTitle = document.querySelector("#dashboard-title");
  const dashboardCard = document.querySelector("#dashboard-card");
  const totalBooking = document.querySelector("#total-bookings");
  const totalOrders = document.querySelector("#total-orders");
  const orderPending = document.querySelector("#order-pending");
  const orderDone = document.querySelector("#order-done");
  const logout = document.querySelector("#logout");

  dashboarTitle.classList.remove("d-none");
  dashboardCard.classList.remove("d-none");
  orderstable.classList.remove("d-none");
  bookingtable.classList.remove("d-none");

  dashboardbtn.addEventListener("click", async () => {
    dashboardbtn.classList.add("active");
    orderbtn.classList.remove("active");
    bookingbtn.classList.remove("active");
    dashboarTitle.classList.remove("d-none");
    dashboardCard.classList.remove("d-none");
    orderstable.classList.remove("d-none");
    bookingtable.classList.remove("d-none");
  });

  orderbtn.addEventListener("click", async () => {
    orderstable.classList.remove("d-none");
    bookingtable.classList.add("d-none");
    dashboarTitle.classList.add("d-none");
    dashboardCard.classList.add("d-none");
    dashboardbtn.classList.remove("active");
    orderbtn.classList.add("active");
    bookingbtn.classList.remove("active");
  });
  bookingbtn.addEventListener("click", async () => {
    orderstable.classList.add("d-none");
    bookingtable.classList.remove("d-none");
    dashboarTitle.classList.add("d-none");
    dashboardCard.classList.add("d-none");
    dashboardbtn.classList.remove("active");
    bookingbtn.classList.add("active");
    orderbtn.classList.remove("active");
  });

  //generate orders table
  function getOrders() {
    try {
      fetch("/orders")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          const orderBody = document.getElementById("order-list");
          orderBody.innerHTML = "";
          let totalOrderCount = 0;
          let totalPendingCount = 0;
          let totalDoneCount = 0;
          data.forEach((order) => {
            //calculate total orders
            if (order.id != null) {
              totalOrderCount++;
              console.log(totalOrderCount);
              if (
                order.status === "in preparation" ||
                order.status === "ordered"
              ) {
                totalPendingCount++;
              } else if (order.status === "ready") {
                totalDoneCount++;
              }
            }
            const row = document.createElement("tr");

            //Order id
            const orderId = document.createElement("td");
            orderId.textContent = order.id;
            row.appendChild(orderId);

            //Order date
            const orderDate = document.createElement("td");
            orderDate.textContent = new Date(order.date).toLocaleString();
            row.appendChild(orderDate);

            //Order items
            const orderItems = document.createElement("td");
            const itemList = document.createElement("ul");

            const items = JSON.parse(order.items);

            items.forEach((item) => {
              const listElement = document.createElement("li");
              listElement.textContent = `${item.name} (x${item.quantity})`;
              itemList.appendChild(listElement);
            });
            orderItems.appendChild(itemList);
            row.appendChild(orderItems);

            //Total
            const orderTotal = document.createElement("td");
            orderTotal.textContent = `${order.total} $`;
            row.appendChild(orderTotal);

            //Status
            const orderStatus = document.createElement("td");
            //orderStatus.textContent = order.status;

            //add dropdown status
            const dropdown = document.createElement("div");
            dropdown.classList.add("dropdown-center");

            const dropdownButton = document.createElement("button");
            dropdownButton.classList.add(
              "btn",
              "btn-info",
              "btn-sm",
              "w-100",
              "dropdown-toggle"
            );
            dropdownButton.textContent = order.status;
            dropdownButton.setAttribute("type", "button");
            dropdownButton.setAttribute("data-bs-toggle", "dropdown");
            dropdownButton.setAttribute("aria-expanded", "false");

            //set initial color based on status
            setButtonColor(dropdownButton, order.status);

            const dropdownMenu = document.createElement("ul");
            dropdownMenu.classList.add("dropdown-menu");
            const statusList = ["ordered", "in preparation", "ready"];

            statusList.forEach((status) => {
              const statusItem = document.createElement("li");
              const statusBtn = document.createElement("button");
              statusBtn.classList.add("dropdown-item");
              statusBtn.textContent = status;

              if (status === order.status) {
                statusBtn.setAttribute("disabled", "true");
              }

              statusBtn.addEventListener("click", async () => {
                await updateOrderStatus(order.id, status);
                //update status and color
                dropdownButton.textContent = status;
                setButtonColor(dropdownButton, status);
              });

              statusItem.appendChild(statusBtn);
              dropdownMenu.appendChild(statusItem);
            });
            dropdown.appendChild(dropdownButton);
            dropdown.appendChild(dropdownMenu);
            orderStatus.appendChild(dropdown);

            row.appendChild(orderStatus);

            //Action
            const orderAction = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.classList.add(
              "btn",
              "btn-danger",
              "btn-sm",
              "w-100",
              "delete-order"
            );
            deleteButton.textContent = "Delete";
            orderAction.appendChild(deleteButton);
            row.appendChild(orderAction);

            deleteButton.addEventListener("click", async (e) => {
              e.stopPropagation();
              const result = await deleteOrder(order.id);
              if (result) {
                row.remove();
              }
            });

            orderBody.appendChild(row);
          });
          //update total orders
          totalOrders.textContent = totalOrderCount;
          //update total pending orders
          orderPending.textContent = totalPendingCount;
          //update total done orders
          orderDone.textContent = totalDoneCount;
        });
    } catch (error) {
      console.error("Error in orders retrieval:", error);
    }
  }
  //set button color
  function setButtonColor(button, status) {
    button.className = "btn btn-sm w-100 dropdown-toggle";
    switch (status) {
      case "ordered":
        button.classList.add("btn-info");
        break;
      case "in preparation":
        button.classList.add("btn-warning");
        break;
      case "ready":
        button.classList.add("btn-success");
        break;
      default:
        button.classList.add("btn-info");
        break;
    }
  }

  //generate booking table
  async function getBookings() {
    try {
      const response = await fetch("/book-table");

      if (!response.ok) {
        throw new Error("Error retrieving bookings");
      }

      const data = await response.json();
      console.log(data);
      const bookingBody = document.getElementById("booking-list");
      bookingBody.innerHTML = "";
      let totalBookingCount = 0;

      data.forEach((booking) => {
        //calculate total bookings
        if (booking.id != null) {
          totalBookingCount++;
          console.log(totalBookingCount);
        }

        const row = document.createElement("tr");

        //Booking name
        const bookingName = document.createElement("td");
        bookingName.textContent = booking.name;
        row.appendChild(bookingName);

        //Booking phone
        const bookingPhone = document.createElement("td");
        bookingPhone.textContent = booking.phone;
        row.appendChild(bookingPhone);

        //Booking date-time
        const bookingDate = document.createElement("td");
        bookingDate.textContent = new Date(booking.date).toLocaleString();
        row.appendChild(bookingDate);

        //Booking guests
        const bookingGuests = document.createElement("td");
        bookingGuests.textContent = booking.guest;
        row.appendChild(bookingGuests);

        //Booking message
        const bookingMessage = document.createElement("td");
        bookingMessage.textContent = booking.message;
        row.appendChild(bookingMessage);

        //Action
        const bookingAction = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.classList.add(
          "btn",
          "btn-danger",
          "btn-sm",
          "delete-booking"
        );
        deleteButton.textContent = "X";
        bookingAction.appendChild(deleteButton);
        row.appendChild(bookingAction);

        deleteButton.addEventListener("click", async (e) => {
          e.stopPropagation();
          const result = await deleteBookings(booking.id);
          if (result) {
            row.remove();
          }
        });

        bookingBody.appendChild(row);
      });
      //update total booking
      totalBooking.textContent = totalBookingCount;
    } catch (error) {
      console.error("Error in bookings retrieval:", error);
    }
  }

  getOrders();
  getBookings();

  //logout
  logout.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include", // include cookies
      });

      if (!response.ok) {
        throw new Error("Error logging out");
      }

      const data = await response.json();
      console.log("Logged out", data);

      sessionStorage.removeItem("accessToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error in logout:", error);
    }
  });
});
