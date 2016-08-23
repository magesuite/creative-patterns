<section class="cc-component-picker | {{ class }}">
    <ul class="cc-component-picker__list">
        <template v-for="component in components">
            <li class="cc-component-picker__list-item">
                <a class="cc-component-picker__component-link" href="#" @click.prevent="onPickComponent( component.type )">
                    <figure class="cc-component-picker__component-figure">
                        <img v-bind:src="component.cover" alt="{{ component.coverAlt }}" class="cc-component-picker__component-cover">
                        <figcaption class="cc-component-picker__component-description">{{ component.name }}</figcaption>
                    </figure>
                </a>
            </li>
        </template>
    </ul>
</section>
