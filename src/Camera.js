class Camera {
    constructor() {
        this.fov = 90;
        this.eye = new Vector3([0, 0, 3]);
        this.at = new Vector3([0, 0, -100]);
        this.up = new Vector3([0, 1, 0]);
        this.viewMat = new Matrix4();
        this.viewMat.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.at.elements[0], this.at.elements[1], this.at.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        this.projMat = new Matrix4();
        this.projMat.setPerspective(this.fov, canvas.width / canvas.height, 0.1, 1000);
        this.VerticalSpeed = 0.75;
        this.HorizontalSpeed = 0.5;
    }

    moveForward() {
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        f = f.normalize();
        this.at = this.at.add(f.mul(this.VerticalSpeed));
        this.eye = this.eye.add(f.mul(this.VerticalSpeed));
        this.updateViewMatrix();
    }

    moveBackward() {
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();
        this.at = this.at.sub(f.mul(this.VerticalSpeed));
        this.eye = this.eye.sub(f.mul(this.VerticalSpeed));
        this.updateViewMatrix();
    }

    moveLeft() {
        let f = new Vector3();
        f.set(this.eye);
        f.sub(this.at);
        let s = new Vector3();
        s.set(f);
        s = Vector3.cross(f, this.up);
        s = s.normalize();
        this.at = this.at.add(s.mul(this.HorizontalSpeed));
        this.eye = this.eye.add(s.mul(this.HorizontalSpeed));
        this.updateViewMatrix();
    }

    moveRight() {
        let f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        let s = new Vector3();
        s.set(f);
        s = Vector3.cross(f, this.up);
        s = s.normalize();
        this.at = this.at.add(s.mul(this.HorizontalSpeed));
        this.eye = this.eye.add(s.mul(this.HorizontalSpeed));
        this.updateViewMatrix();
    }

    panLeft() {
        var f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        var rotationMatrix = new Matrix4().setRotate(3, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        var f_prime = rotationMatrix.multiplyVector3(f);
        this.at = f_prime.add(this.eye);
        this.updateViewMatrix();
    }

    panRight() {
        var f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        var rotationMatrix = new Matrix4().setRotate(-3, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        var f_prime = rotationMatrix.multiplyVector3(f);
        this.at = f_prime.add(this.eye);
        this.updateViewMatrix();
    }

    panLeft_Mouse(deg) {
        var f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        var rotationMatrix = new Matrix4().setRotate(deg, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        var f_prime = rotationMatrix.multiplyVector3(f);
        var tempEye = new Vector3([0, 0, 0]);
        tempEye.set(this.eye);
        this.at = tempEye.add(f_prime);
        this.updateViewMatrix();
    }

    panRight_Mouse(deg) {
        var f = new Vector3();
        f.set(this.at);
        f.sub(this.eye);
        var rotationMatrix = new Matrix4().setRotate(deg, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        var f_prime = rotationMatrix.multiplyVector3(f);
        var tempEye = new Vector3([0, 0, 0]);
        tempEye.set(this.eye);
        this.at = tempEye.add(f_prime);
        this.updateViewMatrix();
    }

    updateViewMatrix() {
        this.viewMat.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.at.elements[0], this.at.elements[1], this.at.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}