const timeline = {
  ".entries": {
    width: `calc(100% - 80px)`,
    maxWidth: `800px`,
    margin: `auto`,
    position: `relative`,
    left: `-5px`,
    ".entry": {
      width: `calc(50% - 80px)`,
      float: `left`,
      padding: `20px`,
      clear: `both`,
      textAlign: `right`,
      "&:not(:first-child)": {
        marginTop: `-60px`,
      },
      ".title": {
        fontSize: `32px`,
        mb: `12px`,
        position: `relative`,
        color: `#fff`,
        "&:before": {
          content: "",
          position: `absolute`,
          width: `8px`,
          height: `8px`,
          border: `4px solid #ffffff`,
          backgroundColor: `#1D1D1D`,
          borderRadius: `100%`,
          top: `50%`,
          transform: `translateY(-50%)`,
          right: `-73px`,
          zIndex: `1000`,
        },
        "&.big:before": {
          width: `24px`,
          height: `24px`,
          transform: `translate(8px,-50%)`,
        },
      },
      ".body": {
        color: `#aaa`,
        p: {
          lineHeight: `1.4em`,
        },
      },
      "&:nth-child(2n)": {
        textAlign: `left`,
        float: `right`,
        ".title": {
          "&:before": {
            left: `-63px`,
          },
          "&.big:before": {
            transform: `translate(-8px,-50%)`,
          },
        },
      },
    },
  },
};

export default timeline;
