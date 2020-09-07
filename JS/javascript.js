const maker_data = [
    {name: `Srijan Kumar`, age: 12},
    {name: `Daksh Shrivastava`, age: 12}
]

const show_maker_data = () => {console_print.show_table(maker_data)};
const console_print = {
    print: (data) => console.log(data),
    show_error: (data) => console.error(data),
    show_warning: (data) => console.warn(data),
    show_table: (data) => console.table(data),
    show_count: (data) => console.count(data),
    group_
}
const mr_maker = name => `Mr. ${name}`;
const dr_maker = name => `Dr. ${name}`;
const full_name = (first_name, last_name) => `${first_name} ${last_name}`;
const try_click = () => console_print(`Yes, it's working! Good job!`);
const trial = () => {console_print('Hello MTTI')};
const try_btn = () => {
    console.groupCollapsed("This is trying a button.");
        console_print.print(`This is 'log'.`);
        console_print.show_error(`This is 'error'.`);
        console_print.show_warning(`This is 'warning'.`);
    console.groupEnd();
}
const arithmetic = {
    add: function(no1, no2) {
        return (no1 + no2);
    },
    subtract: function(no1, no2) {
        return (no1 - no2);
    },
    multiply: function(no1, no2) {
        return (no1 * no2);
    },
    divide: function(no1, no2) {
        return (no1 / no2);
    },
    power: function(no1, no2) {
        return (no1 ** no2);
    },
    square: (num) => {
        return (num ** 2);
    },
    cube(num) {
        return (num ** 3);
    }
};