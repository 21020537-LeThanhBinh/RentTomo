import { FixedSizeList as List } from "react-window";

export default function MenuList({ options, children, maxHeight, getValue }: any) {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * 35;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={35}
      initialScrollOffset={initialOffset}
      width={"100%"}
    >
      {({ index, style }) => <div style={style} > {children[index]}</div>}
    </List >
  );
}