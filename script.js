const clear = document.querySelector( '.clearAll' );
const ul = document.querySelector( 'ul' );
const li = document.querySelectorAll( 'li' );

// Display Itesm Store in local storage
const displayItems = () =>
{
    const itemFromStorage = getItemsFromStorage();
    itemFromStorage.forEach( ( item ) =>
    {
        addChild( item );
    } );
};
document.addEventListener( 'DOMContentLoaded', displayItems );


// Create item for the list
const addChild = ( item ) =>
{
    const itemLi = document.createElement( 'li' );
    itemLi.className = 'border-2 rounded-md py-2 px-4 mb-4';

    const div = document.createElement( 'div' );
    div.className = 'flex items-center justify-between';

    const span = document.createElement( 'span' );
    span.className = 'font-bold';
    span.innerText = `${ item }`;

    const icon = document.createElement( 'i' );
    icon.className = 'fa-solid fa-x delete';
    icon.style.color = '#e61e1e';

    itemLi.appendChild( div );
    div.appendChild( span );
    div.appendChild( icon );
    ul.appendChild( itemLi );
};
// Add the items to local storage
const addChildToStorage = ( item ) =>
{
    let itemFromStorage;
    if ( localStorage.getItem( 'items' ) === null )
    {
        itemFromStorage = [];
    } else
    {
        itemFromStorage = JSON.parse( localStorage.getItem( 'items' ) );
    }
    itemFromStorage.push( item );
    localStorage.setItem( 'items', JSON.stringify( itemFromStorage ) );
};

// Get the items from local storage
const getItemsFromStorage = () =>
{
    let itemFromStorage;
    if ( localStorage.getItem( 'items' ) === null )
    {
        itemFromStorage = [];
    } else
    {
        itemFromStorage = JSON.parse( localStorage.getItem( 'items' ) );
    }
    return itemFromStorage;
};

// Remove item from storage
const removeItemFromStorage = ( item ) =>
{
    let itemsFromStorage = getItemsFromStorage();
    itemsFromStorage = itemsFromStorage.filter( ( storedItem ) => storedItem !== item );
    localStorage.setItem( 'items', JSON.stringify( itemsFromStorage ) );
};


const enter = document.querySelector( '.enter' );
const add = document.querySelector( '.submit' );

//let textSrc;
// Gets text from input field
// enter.addEventListener('input', (e) => {
//     textSrc = e.target.value;
// });

// Add the item in list when add is clicked
add.addEventListener( 'click', ( e ) =>
{
    e.preventDefault();
    if ( enter.value === '' )
    {
        alert( 'Add Item' );
    } else
    {
        addChild( enter.value );
        addChildToStorage( enter.value );
        const li = document.querySelectorAll( 'li' );
        checkUI();
    }
    enter.value = '';
} );

// Filter
const filter = document.querySelector( '.fillter' );
const span = document.querySelectorAll( 'span' );
const rotate = document.querySelector( '.rotate' );

//let textFilter = '';
// filter.addEventListener('input', (e) => {
//     textFilter = e.target.value;
// });

filter.addEventListener( 'keydown', ( e ) =>
{
    if ( e.key === 'Enter' )
    {
        e.preventDefault();
        span.forEach( ( item ) =>
        {
            if ( item.innerText != filter.value && filter.value != '' )
            {
                item.parentElement.parentElement.style.display = 'none';
                console.log( item.innerText );
            }
        } );
    }
} );

rotate.addEventListener( 'click', () =>
{
    span.forEach( ( item ) =>
    {
        item.parentElement.parentElement.style.display = 'block';
    } );
    filter.value = '';
} );


// Remove element when the node with class delete is clicked
ul.addEventListener( 'click', ( e ) =>
{
    if ( e.target.classList.contains( 'delete' ) )
    {
        const itemText = e.target.previousElementSibling.innerText;
        console.log( itemText );
        removeItemFromStorage( itemText );
        e.target.parentElement.parentElement.remove();
    }
    const li = document.querySelectorAll( 'li' );
    checkUI();
} );

// Remove all
clear.addEventListener( 'click', () =>
{
    const li = document.querySelectorAll( 'li' );
    li.forEach( ( item ) =>
    {
        item.remove();
        const itemText = item.innerText;
        removeItemFromStorage( itemText );
    } );
    checkUI();
} );


// Check UI
const filterItems = document.querySelector( '#filter-items' );
const clr = document.querySelector( '#clr' );
const checkUI = () =>
{
    const li = document.querySelectorAll( 'li' );
    if ( li.length === 0 )
    {
        clr.style.display = 'none';
        filter.style.display = 'none';
    } else
    {
        clr.style.display = 'block';
        filter.style.display = 'block';
    }
}




