
function renderItems(items) {
    return items.map(item => (
        <div>{item.name}</div>
    ))
}

function ItemBrowser({items}) {
  return (
    <div>
      {renderItems(items)}
    </div>
  );
}

export default ItemBrowser;
