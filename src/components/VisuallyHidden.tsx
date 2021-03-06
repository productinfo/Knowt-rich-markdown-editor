import styled from "styled-components";

const VisuallyHidden = styled.span`
  position: absolute !important;
  height: 0px;
  width: 0px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
`;

export default VisuallyHidden;
