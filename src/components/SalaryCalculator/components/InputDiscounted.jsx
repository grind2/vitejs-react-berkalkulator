
const InputDiscounted = ({d, sd, nd, snd}) => {
  

  return (
    <div>
        <button onClick={() => nd > 0 && snd(nd - 1)}>
        ➖
        </button>
        {nd} 
        <button onClick={() => snd(nd + 1)}>
        ➕
        </button>
        eltartott, ebből kedvezményezett:
        <button onClick={() => d > 0 && sd(d - 1)}>
        ➖
        </button>
        {d}
        <button onClick={() => nd > d && d < 3 && sd(d + 1)}>
        ➕
        </button>
    </div>
  );
}

export default InputDiscounted;
