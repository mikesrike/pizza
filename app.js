var menu = [
    {
        'number': 1,
        'name': 'Margerita',
        'ingredients': 'ser, szynka'
    },
    {
        'number': 2,
        'name': 'Serowa',
        'ingredients': 'ser feta, ser mozarella, ser gouda'
    },
    {
        'number': 3,
        'name': 'Hawajska',
        'ingredients': 'ser, szynka'
    },
    {
        'number': 4,
        'name': 'Farmerska',
        'ingredients': 'ser, pomidor, cebula, szynka'
    },
    {
        'number': 5,
        'name': 'Cztery pory roku',
        'ingredients': 'kukurydza, brokuł, cebula, kurczak'
    },
    {
        'number': 6,
        'name': 'Wegetariańska',
        'ingredients': 'brokuł, rucola, kukurydza'
    },
    {
        'number': 7,
        'name': 'Gyros',
        'ingredients': 'ser, kurczak, cebula'
    },
    {
        'number': 8,
        'name': 'Owoce morza',
        'ingredients': 'ser, pomidor, krewetki'
    },
    {
        'number': 9,
        'name': 'Wołowa',
        'ingredients': 'ser, mięso wołowe, cebula'
    },
    {
        'number': 10,
        'name': 'Meksykańska',
        'ingredients': 'ser, fasola, chilli, kukurydza'
    }
];

var orders = [];

function getPizzaRow(number) {
    var pizza = menu[number - 1];

    var td_number = '<td class="has-text-centered">' + pizza.number + '</td>';
    var td_name = '<td>' + pizza.name + '</td>';
    var td_ingredients = '<td class="ingredients">' + pizza.ingredients + '</td>';

    var button_a = '<td class="has-text-right">';
    var button_b = '<button onclick="orderPizza(' + pizza.number;
    var button_c = ')" class="button is-small is-rounded is-link order-button">Zamów</button>';
    var button_d = '</td>';

    var td_button = button_a + button_b + button_c + button_d;

    var tr_a = '<tr data-number=' + pizza.number + '>';
    var tr_b = '</tr>';

    var tr = tr_a + td_number + td_name + td_ingredients + td_button + tr_b;

    return tr;
}

function getOrderRow(number, index) {
    var pizza = menu[number - 1];
    var order_number = index;

    var td_number = '<td class="has-text-centered">' + pizza.number + '</td>';
    var td_name = '<td>' + pizza.name + '</td>';
    var td_ingredients = '<td>' + pizza.ingredients + '</td>';

    var button_a = '<td class="has-text-right">';
    var button_b = '<button onclick="getPizza(' + order_number;
    var button_c = ')" class="button is-small is-rounded is-success order-button">Odbierz</button>';
    var button_d = '</td>';

    var info = '<p>Pozostały czas: ' + orders[index].time + '</p>';

    if (orders[index].time) {
        var td_button = '<td class="has-text-right">' + info + '</td>';
    }  else {
        var td_button = button_a + button_b + button_c + button_d;
    }

    var tr_a = '<tr data-number=' + order_number + '>';
    var tr_b = '</tr>';

    var tr = tr_a + td_number + td_name + td_ingredients + td_button + tr_b;

    return tr;
}

function loadMenu() {
    var table = document.getElementById('pizza-menu');

    for (var i = 0; i < menu.length; i++) {
        var pizza = menu[i];

        table.insertAdjacentHTML('beforeend', getPizzaRow(pizza.number));
    }

    return;
}

function orderPizza(number) {
    pizza = menu[number - 1];

    new_order = {
        'number': pizza.number,
        'name': pizza.name,
        'ingredients': pizza.ingredients,
        'time': 10
    };

    orders.push(new_order);

    refreshOrders();

    return;
}

function refreshOrders() {
    var notify = document.getElementById('notify');
    var table = document.getElementById('order-table');
    var order_menu = document.getElementById('order-menu');
    var empty = true;

    order_menu.innerHTML = '';

    for (var i = 0; i < orders.length; i++) {
        var pizza = orders[i];

        if (pizza) {
            order_menu.insertAdjacentHTML('beforeend', getOrderRow(pizza.number, i));
            empty = false;
        }
    }

    if (empty) {
        notify.classList.remove('is-hidden');
        table.classList.add('is-hidden');
    } else {
        notify.classList.add('is-hidden');
        table.classList.remove('is-hidden');
    }

    return;
}

function getPizza(number) {
    delete orders[number];

    refreshOrders();

    return;
}


loadMenu();

setInterval(function() {
    for (var i = 0; i < orders.length; i++) {
        if (orders[i]) {
            var time = orders[i].time;
            
            if (time > 0) {
                orders[i].time = time - 1;
            }
        }
    }

    refreshOrders();
}, 1000);
