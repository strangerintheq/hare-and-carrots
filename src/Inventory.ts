export function inventory() {
    let items = document.querySelectorAll('.grid div');
    let el;
    items.forEach((e: any) => {
        e.id = 'id_' + Math.random().toString(36).substring(2);
        e.draggable = true;
        e.ondragstart = () => {
            el = e;
            el.style.transform = 'scale(0.5)';
        };
        e.ondragend = () => el.style.transform = 'scale(1)';
    });

    document.querySelectorAll('.grid').forEach((e: any) => {
        e.ondragover = ev => ev.preventDefault();
        e.ondrop = ev => {
            e.append(el)
            console.log('move_to_' + e.id + '/' + el.id);
        };
    })
}