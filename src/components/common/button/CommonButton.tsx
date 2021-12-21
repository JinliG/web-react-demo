import React, {
  useState, forwardRef, useImperativeHandle, useMemo,
} from 'react';
import { Button, Popconfirm } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { debounce, isEmpty, noop } from 'lodash';

interface CommonButtonProps extends BaseButtonProps {
  [any: string]: any;
}

function CommonButton(props: CommonButtonProps) {
  const {
    withConfirm, withLoading, withDebounce, onClick = noop, children,
  } = props;
  const [loading, setLoading] = useState(false);

  // if (withLoading) {
  //   useImperativeHandle(
  //     ref,
  //     () => ({ setButtonLoading: setLoading }),
  //   );
  // }

  let onButtonClick = onClick;
  if (!isEmpty(withDebounce)) {
    const { waiting = 200 } = withDebounce || {};
    onButtonClick = debounce((e) => onClick(e), waiting);
  }

  let ButtonDom = (
    <Button
      {...props}
      loading={loading}
      onClick={(e) => { e.stopPropagation(); onButtonClick(e); }}
    >
      {children}
    </Button>
  );
  if (!isEmpty(withConfirm)) {
    const { onConfirm = onClick, title = '', ...rest } = withConfirm || {};
    ButtonDom = <Popconfirm title={title} onConfirm={onConfirm} {...rest}>{ButtonDom}</Popconfirm>;
  }

  return ButtonDom;
}

export default CommonButton;
