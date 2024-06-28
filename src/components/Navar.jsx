import React from 'react'

export default function Navar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg mx-5 mb-5" style={{ width: "100%"}}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            BANCO A
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./menu">
                  Menu
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/transferirMio">
                Transferir mis cuentas
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/transferirOtro">
                  Transferir a otros
                </a>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
