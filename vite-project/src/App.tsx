import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useRef, useState } from 'react';
import { Card, Container, Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

const App = () => {
  const [show, setShow] = useState(false);
  const [shareShow, setShareShow] = useState(false);
  const [input, setInput] = useState({
    name: '',
    type: '',
    desc: '',
    atk: '',
    def: '',
    img: ''
  });

  const [imageUrl, setImageUrl] = useState('');
  const cardRef = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setInput(prev => ({ ...prev, img: url }));
    }
  };

  const handleChange = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSample = () => {
    setInput({
      name: 'ブラック・マジシャンギャル',
      type: '魔法使い族',
      desc: '魔法使いとしては攻撃力・守備力ともに最高クラス。',
      atk: '2500',
      def: '2100',
      img: '../public/photo.png'
    });
    setImageUrl('');
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'yugioh-card.png';
    link.click();
    setShareShow(true);
  };

  return (
    <Container className="p-4">
      <Card body className="mb-3">
        <h3 className="text-center mb-4">遊戯王カード作成</h3>
        <input className="form-control mb-2" type="text" name="name" placeholder="モンスター名" value={input.name} onChange={handleChange} maxLength={13} />
        <input className="form-control mb-2" type="text" name="type" placeholder="属性" value={input.type} onChange={handleChange} />
        <textarea className="form-control mb-2" name="desc" placeholder="効果" value={input.desc} onChange={handleChange}></textarea>
        <input className="form-control mb-2" type="text" name="atk" placeholder="攻撃力" value={input.atk} onChange={handleChange} />
        <input className="form-control mb-2" type="text" name="def" placeholder="守備力" value={input.def} onChange={handleChange} />
        <input className="form-control mb-2" type="file" accept="image/*" onChange={handleImage} />
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={() => setShow(true)}>作成</Button>
          <Button variant="secondary" onClick={handleSample}>参考</Button>
        </div>
      </Card>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Body>
          <div ref={cardRef} className="yugioh-card">
            <div className="card-header">
              <h2 className="card-title">{input.name}</h2>
              <div className="card-stars">★★★★★★★</div>
            </div>
            <div className="card-image">
              {input.img && <img src={input.img} alt={input.name} />}
            </div>
            <div className="card-type">[{input.type}]</div>
            <div className="card-description">
              <p>{input.desc}</p>
            </div>
            <div className="card-stats">
              <span>攻撃力 {input.atk}</span>
              <span>守備力 {input.def}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>閉じる</Button>
          <Button variant="success" onClick={handleSaveImage}>画像保存</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={shareShow} onHide={() => setShareShow(false)} centered>
        <Modal.Body className="text-center">
          <p>画像を保存しました！</p>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('自作の遊戯王カードを作ったよ！')}&url=https://your-app-url.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Xでシェアする
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShareShow(false)}>閉じる</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
